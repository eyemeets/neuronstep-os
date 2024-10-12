import { v4 as uuidv4 } from 'uuid'
import { zodResponseFormat } from 'openai/helpers/zod'
import { sendMessageAndParseResponse, setupAssistantAndThread } from '../openai'
import { createUserPromptForCourseOutlineSchema, createUserPromptForCurriculumPlan } from './prompt'
import { ZodCourseOutlineSchema, ZodCurriculumPlanSchema } from './schema'
import mockupCurriculumOutline from '../../mockup/curriculum-outline'
import { generateCourseImagePrompt, generateSubtopicImagePrompt, generateTopicImagePrompt } from '../../utils/image-prompts'

import type { AssistantResponseFormatOption } from 'openai/resources/beta/threads/threads'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { collections } from 'shared-constants'
import { writeToFirestore } from '../firestore'

import type { CourseObjectiveSchema, CoursePlanSchema } from 'shared-types'

export async function analyzeContent(params: CourseObjectiveSchema, user: UserRecord) {
  try {
    const assistant = await setupAssistantAndThread({
      name: 'Curriculum Designer',
      instructions: 'You are an expert curriculum designer with a deep understanding of educational frameworks and adaptive learning strategies.',
      assistantId: params.assistant_id,
      threadId: params.threadId
    })
  
    // Step 1: Generate Curriculum Plan
    console.log('Generate Curriculum Plan')
  
    const curriculumPlan = params.use_mockup_data ?
      mockupCurriculumOutline.plan :
      await generateCurriculumPlan({
        validatedObjective: params,
        threadId: assistant.threadId,
        assistantId: assistant.assistantId,
        responseFormat: zodResponseFormat(ZodCurriculumPlanSchema, 'validation_response')
      })
  
    if (!curriculumPlan) {
      throw new Error('Failed to generate curriculum outline.')
    }
  
    await writeToFirestore({
      path: collections.course.plans,
      uid: user.uid,
      data: curriculumPlan
    })
  
    console.log('Finished generating Curriculum Plan')
  
    // Step 4: Generate Main Topics, Sub Topics, and Pages based on the plan
    console.log('Generate Main Topics, Sub Topics, and Pages based on the plan')
  
    // Generate content
    const curriculumOutline = params.use_mockup_data ?
      mockupCurriculumOutline.outline :
      await createContentOutlineForCurriculum({
        validatedObjective: params,
        curriculumPlan: curriculumPlan,
        threadId: assistant.threadId,
        assistantId: assistant.assistantId,
        responseFormat: zodResponseFormat(ZodCourseOutlineSchema, 'validation_response')
      })
  
    if (!curriculumOutline) {
      throw new Error('Failed to generate curriculum outline.')
    }
    // Format data
    const courseTitle = curriculumOutline.title
    const courseDescription = curriculumOutline.description
  
    console.log('user_query', params.user_query)
  
    const courseImagePrompt = generateCourseImagePrompt(params.image_theme, courseTitle, courseDescription, params.user_query)
  
    curriculumOutline.img_prompt = courseImagePrompt
    console.log('courseImagePrompt -> ', courseImagePrompt)
  
    const formattedChapters = curriculumOutline.chapters.map((chapter) => {
      const topicImagePrompt = generateTopicImagePrompt(params.image_theme, chapter.topic)
  
      console.log('topicImagePrompt -> ', topicImagePrompt)
  
      return {
        ...chapter,
        id: `chapter-${uuidv4()}`, // Generate id if missing
        img_prompt: topicImagePrompt, // This assigns the image prompt for the topic
        subtopics: chapter.subtopics.map((subtopic) => {
          const subtopicImagePrompt = generateSubtopicImagePrompt(params.image_theme, subtopic.subtopic)
  
          return {
            ...subtopic,
            id: `subtopic-${uuidv4()}`, // Generate id if missing
            img_prompt: subtopicImagePrompt,
            pages: subtopic.pages.map((page) => {
              return {
                ...page,
                id: `page-${uuidv4()}`, // Generate id if missing
                content: page.content || '' // Ensure content always has a value
              }
            })
          }
        })
      }
    })
  
    // Add course ID as well
    const courseId = `course-${uuidv4()}`
  
    curriculumOutline.id = courseId
    curriculumOutline.chapters = formattedChapters
  
    // Write to DB
    await writeToFirestore({
      docId: params.objective_id,
      path: collections.course.outlines,
      uid: user.uid,
      data: curriculumPlan
    }) 
  
    return {
      objective: params,
      plan: curriculumPlan,
      outline: curriculumOutline
    }
  }  
  
  catch (e) {
    const error = e as Error

    console.error('Error during content analysis:', error)

    // Optionally throw the error again or return a structured error response
    throw new Error(`Failed to analyze content: ${error.message}`)
  }
}

async function generateCurriculumPlan(params: {
  validatedObjective: CourseObjectiveSchema
  assistantId: string
  threadId: string
  responseFormat: AssistantResponseFormatOption | null | undefined
}): Promise<CoursePlanSchema | undefined> {
  const userMsgForCurriculumPlan = createUserPromptForCurriculumPlan(params.validatedObjective)

  // Send the message and get the curriculum plan
  const plan = await sendMessageAndParseResponse<CoursePlanSchema>({
    stream: false,
    assistantId: params.assistantId,
    threadId: params.threadId,
    userMessageContent: userMsgForCurriculumPlan,
    responseFormat: params.responseFormat,
    schema: ZodCurriculumPlanSchema,
    errorMessage: 'Failed to parse curriculum plan'
  })

  // If plan is undefined, return undefined
  if (!plan) {
    return undefined
  }

  // Assign the assistantId and threadId to the plan
  plan.assistantId = params.assistantId
  plan.threadId = params.threadId

  return plan
}

async function createContentOutlineForCurriculum(params: {
  stream?: boolean
  validatedObjective: CourseObjectiveSchema
  curriculumPlan: CoursePlanSchema | undefined
  assistantId: string
  threadId: string
  responseFormat: AssistantResponseFormatOption | null | undefined
}, processChunk?: (chunk: string) => void) {
  // Handle case where curriculumPlan is undefined
  if (!params.curriculumPlan) {
    console.error('Curriculum plan is undefined, cannot proceed with content outline generation.')
    return undefined // Return early if curriculumPlan is undefined
  }

  // Create the user message for curriculum outline schema
  const userMsgForTopics = createUserPromptForCourseOutlineSchema(params.validatedObjective, params.curriculumPlan)

  // Use sendMessageAndParseResponse with streaming enabled and pass the processChunk callback
  const topics = await sendMessageAndParseResponse({
    stream: params.stream,
    assistantId: params.assistantId,
    threadId: params.threadId,
    userMessageContent: userMsgForTopics,
    responseFormat: params.responseFormat,
    schema: ZodCourseOutlineSchema,
    errorMessage: 'Failed to parse educational outline'
  }, processChunk) // Pass the callback function to handle streamed chunks

  return topics // Return the final topics (could be valid or undefined)
}
