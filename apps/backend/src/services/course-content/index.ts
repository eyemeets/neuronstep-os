// content-generator/createContentForCourse.ts
import { zodResponseFormat } from 'openai/helpers/zod'
import { sendMessageAndParseResponse } from '../openai'
import { createInitialInstructionPrompt, createContentPromptForBlock } from './prompt'
import type { BlockContentResponse, InitialInstructionResponse } from './schema'
import { ZodInitialInstructionResponseSchema, ZodBlockContentResponseSchema } from './schema'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { collections } from '@repo/shared-constants'
import { writeToFirestore } from '../firestore'
import type { CourseGenStructure } from '@repo/shared-types'

export async function createContentForCourse(params: CourseGenStructure, user: UserRecord) {
  const assistantId = params.plan.assistant_id
  const threadId = params.plan.thread_id

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
    console.log('Initial response confirmation:', initialResponse.confirmation)
  }
  else {
    console.error('Failed to receive initial response.')
    return 'Failed to receive initial response.'
  }

  // Step 2: Iterate over chapters, subtopics, and pages to generate content
  for (const chapter of params.outline.chapters.slice(0, 1)) {
    for (const subtopic of chapter.subtopics.slice(0, 1)) {
      for (const page of subtopic.pages.slice(0, 1)) {
        if (page.content?.length) {
          console.log(`Content already exists for block: ${page.block_title}, skipping...`)
          continue
        }

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
    docId: params.objective.objective_id,
    path: collections.course.content,
    uid: user.uid,
    data: params.outline
  })

  console.log('Content generation completed for course:', params.plan.title)
  return params.outline
}
