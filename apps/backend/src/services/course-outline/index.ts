import { v4 as uuidv4 } from 'uuid'
import { zodResponseFormat } from 'openai/helpers/zod'
import { sendMessageAndParseResponse } from '../openai'
import { createUserPromptForCourseOutlineSchema } from './prompt'
import { ZodCourseOutlineSchema } from './schema'
import mockupCurriculumOutline from '../../mockup/curriculum-outline'
import { generateCourseImagePrompt, generateSubtopicImagePrompt, generateTopicImagePrompt } from '../../utils/img-prompts'

import type { AssistantResponseFormatOption } from 'openai/resources/beta/threads/threads'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { collections } from '@repo/shared-constants'
import { writeToFirestore } from '../firestore'

import type { CourseObjectiveSchema, CoursePlanSchema, CourseGenStructure } from '@repo/shared-types'
import { createChapterImg, createCourseImg } from '@/utils/img-generation'

export async function createCourseOutline(params: CourseObjectiveSchema, user: UserRecord) {
  try {
    // Generate Main Topics, Sub Topics, and Pages based on the plan
    console.log('Generating an outline structure based on the plan')
  
    // Generate content
    const curriculumOutline = await createContentOutlineForCurriculum({
      validatedObjective: params,
      curriculumPlan: params.plan,
      threadId: params.assistant.threadId,
      assistantId: params.assistant.assistantId,
      responseFormat: zodResponseFormat(ZodCourseOutlineSchema, 'validation_response')
    })
  
    if (!curriculumOutline) {
      throw new Error('Failed to generate curriculum outline.')
    }

    // Add course ID as well
    const courseId = `course-${uuidv4()}`

    curriculumOutline.id = courseId
    curriculumOutline.title = curriculumOutline.title
    curriculumOutline.description = curriculumOutline.description

    // Format data
    const dataForImgParams: CourseGenStructure = {
      objective: params.objective,
      plan: params.plan,
      outline: curriculumOutline
    }
    
    // Image generation for course
    const courseImagePrompt = generateCourseImagePrompt(params.image_theme, curriculumOutline.title, curriculumOutline.description, params.user_query)
    
    curriculumOutline.img_prompt = courseImagePrompt
    curriculumOutline.img_url = await createCourseImg(dataForImgParams, user)
    
  
    // Format chapters - Use Promise.all to resolve async map results
    const formattedChapters = await Promise.all(curriculumOutline.chapters.slice(0, 1).map(async (chapter) => {
      const topicImagePrompt = generateTopicImagePrompt(params.image_theme, chapter.topic)
  
      chapter.img_url = await createChapterImg(dataForImgParams, chapter, user)
    
      return {
        ...chapter,
        id: `chapter-${uuidv4()}`,
        img_prompt: topicImagePrompt,
        subtopics: chapter.subtopics.slice(0, 1).map((subtopic) => {
          const subtopicImagePrompt = generateSubtopicImagePrompt(params.image_theme, subtopic.subtopic)
      
          return {
            ...subtopic,
            id: `subtopic-${uuidv4()}`,
            img_prompt: subtopicImagePrompt,
            pages: subtopic.pages.slice(0, 1).map((page) => ({
              ...page,
              id: `page-${uuidv4()}`,
              content: page.content || ''
            }))
          }
        })
      }
    }))

    curriculumOutline.chapters = formattedChapters

    // Write to DB
    await writeToFirestore({
      docId: params.objective_id,
      path: collections.course.outlines,
      uid: user.uid,
      data: curriculumOutline
    }) 
  
    return {
      objective: params.objective,
      plan: params.plan,
      outline: curriculumOutline
    }
  }  
  
  catch (e) {
    const error = e as Error

    console.error('Error during content analysis:', error)

    // Optionally throw the error again or return a structured error response
    throw new Error(`Failed to generate content: ${error.message}`)
  }
}

async function createContentOutlineForCurriculum(params: {
  stream?: boolean
  validatedObjective: CourseObjectiveSchema
  curriculumPlan: CoursePlanSchema | undefined
  assistantId: string
  threadId: string
  responseFormat: AssistantResponseFormatOption | null | undefined
  useMockupData?: boolean
}, processChunk?: (chunk: string) => void) {

  if (params.useMockupData) {
    return mockupCurriculumOutline.outline
  }
  // Handle case where curriculumPlan is undefined
  if (!params.curriculumPlan) {
    console.error('Curriculum plan is undefined, cannot proceed with content outline generation.')
    return
  }

  // Create the user message for curriculum outline schema
  const userMsgForTopics = createUserPromptForCourseOutlineSchema(params.validatedObjective, params.curriculumPlan)

  // Use sendMessageAndParseResponse with streaming enabled and pass the processChunk callback
  const outline = await sendMessageAndParseResponse({
    stream: params.stream,
    assistantId: params.assistantId,
    threadId: params.threadId,
    userMessageContent: userMsgForTopics,
    responseFormat: params.responseFormat,
    schema: ZodCourseOutlineSchema,
    errorMessage: 'Failed to parse educational outline'
  }, processChunk) // Pass the callback function to handle streamed chunks

  return outline // Return the final topics (could be valid or undefined)
}
