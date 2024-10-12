// content-generator/createContentForCourse.ts
import { zodResponseFormat } from 'openai/helpers/zod'
import { generateDalleImage, sendMessageAndParseResponse } from '../openai'
import { createInitialInstructionPrompt, createContentPromptForBlock } from './prompt'
import type { BlockContentResponse, InitialInstructionResponse } from './schema'
import { ZodInitialInstructionResponseSchema, ZodBlockContentResponseSchema } from './schema'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { CourseOutlineChapterSchema, CourseOutlineSubtopicSchema, CurriculumObjectivePlanAndOutlineStructure } from '@repo/shared-types'
import { uploadImageToFirebase } from '../firestore'
import { collections } from '@repo/shared-constants'
import { writeToFirestore } from '../firestore'

export async function createContentForCourse(params: CurriculumObjectivePlanAndOutlineStructure, user: UserRecord) {
  const assistantId = params.plan.assistantId
  const threadId = params.plan.threadId

  if (!assistantId || !threadId) {
    return 'Assistant ID or Thread ID is required but was not defined.'
  }

  // Step 1: Send initial instruction to set context
  const initialPrompt = createInitialInstructionPrompt(params)
  const initialResponse = await sendMessageAndParseResponse<InitialInstructionResponse>({
    stream: false,
    assistantId,
    threadId,
    userMessageContent: initialPrompt,
    responseFormat: zodResponseFormat(ZodInitialInstructionResponseSchema, 'validation_response'),
    errorMessage: `Failed to send initial instruction for course: ${params.plan.title}`,
    schema: ZodInitialInstructionResponseSchema
  })

  // Check if initialResponse is not undefined
  if (initialResponse) {
    console.log('Initial Instruction Confirmation:', initialResponse.confirmation)
  }
  else {
    console.error('Failed to receive initial response.')
    return 'Failed to receive initial response.'
  }

  params.outline.img_url = await createCourseImg(params, user)

  // Step 2: Iterate over chapters, subtopics, and pages to generate content
  for (const chapter of params.outline.chapters.slice(0, 1)) {
    chapter.img_url = await createChapterImg(params, chapter, user)

    for (const subtopic of chapter.subtopics.slice(0, 1)) {
      subtopic.img_url = await createSubtopicImg(params, subtopic, user)

      for (const page of subtopic.pages.slice(0, 1)) {
        if (page.content?.length) {
          console.log(`Content already exists for block: ${page.block_title}, skipping...`)
          continue
        }

        console.log('-> Generating content for:', page.block_title)
        const contentPrompt = createContentPromptForBlock(params, chapter, subtopic, page)

        const contentResponse = await sendMessageAndParseResponse<BlockContentResponse>({
          stream: false,
          assistantId,
          threadId,
          userMessageContent: contentPrompt,
          responseFormat: zodResponseFormat(ZodBlockContentResponseSchema, 'validation_response'),
          errorMessage: `Failed to generate content for block: ${page.block_title}`,
          schema: ZodBlockContentResponseSchema
        })

        // Check if contentResponse is not undefined
        if (contentResponse) {
          page.content = contentResponse.content
          console.log(`Content generated for block: ${page.block_title}`)
        }
        else {
          console.error(`Failed to generate content for block: ${page.block_title}`)
          return `Failed to generate content for block: ${page.block_title}`
        }
      }
    }
  }

  // Write to Firestore after content generation is completed
  await writeToFirestore({
    docId: params.objective.objective_id, // Ensure the objective ID is correctly used
    path: collections.course.outlines, // Path in Firestore for storing course outlines
    uid: user.uid, // Use user ID for associating the content with the user
    data: params.outline // The course outline data to be written to Firestore
  })

  console.log('Course outline written to Firestore.')
  console.log('Content generation completed for course:', params.plan.title)
  return params.outline
}

async function createCourseImg(params: CurriculumObjectivePlanAndOutlineStructure, user: UserRecord) {
  // Step 1: Generate course image
  const prompt = params.outline.img_prompt
  const imgUrl = await generateDalleImage(prompt)
  
  if (!imgUrl) {
    throw new Error('Course image was undefined')
  }
  
  // Step 2: Upload course image to Firebase Storage
  const courseImagePath = `users/${user.uid}/${params.objective.objective_id}/course-cover-${params.outline.id}.png`
  const courseImageFirebaseUrl = await uploadImageToFirebase(imgUrl, courseImagePath)

  return courseImageFirebaseUrl
}

async function createChapterImg(params: CurriculumObjectivePlanAndOutlineStructure, chapter: CourseOutlineChapterSchema, user: UserRecord) {
  const prompt = chapter.img_prompt
  const imgUrl = await generateDalleImage(prompt)

  if (!imgUrl) {
    throw new Error('Chapter image was undefined')
  }

  const chapterImagePath = `users/${user.uid}/${params.objective.objective_id}/chapter-${chapter.id}.png`
  const chapterImageFirebaseUrl = await uploadImageToFirebase(imgUrl, chapterImagePath)

  return chapterImageFirebaseUrl
}

async function createSubtopicImg(params: CurriculumObjectivePlanAndOutlineStructure, subtopic: CourseOutlineSubtopicSchema, user: UserRecord) {
  const prompt = subtopic.img_prompt
  const imgUrl = await generateDalleImage(prompt)

  if (!imgUrl) {
    throw new Error('Chapter image was undefined')
  }
  const subtopicImagePath = `users/${user.uid}/${params.objective.objective_id}/subtopic-${subtopic.id}.png`
  const subtopicImageFirebaseUrl = await uploadImageToFirebase(imgUrl, subtopicImagePath)

  return subtopicImageFirebaseUrl
}
