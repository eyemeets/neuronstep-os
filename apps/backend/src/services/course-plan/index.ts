import { zodResponseFormat } from 'openai/helpers/zod'
import { sendMessageAndParseResponse, setupAssistantAndThread } from '../openai'
import { createUserPromptForCurriculumPlan } from './prompt'
import { ZodCurriculumPlanSchema } from './schema'
import mockupCurriculumOutline from '../../mockup/curriculum-outline'
import { collections } from '@repo/shared-constants'
import { writeToFirestore } from '../firestore'

import type { AssistantResponseFormatOption } from 'openai/resources/beta/threads/threads'
import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { CourseObjectiveSchema, CoursePlanSchema } from '@repo/shared-types'

export async function createCoursePlan(params: CourseObjectiveSchema, user: UserRecord) {
  try {
    const assistant = await setupAssistantAndThread({
      name: 'Curriculum Designer',
      instructions: 'You are an expert curriculum designer with a deep understanding of educational frameworks and adaptive learning strategies.',
      assistantId: params.assistant_id,
      threadId: params.threadId
    })
  
    // Generate Curriculum Plan
    console.log('Generating curriculum plan')
  
    const curriculumPlan = await generateCurriculumPlan({
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

    return {
      objective: params,
      plan: curriculumPlan
    }
  }  
  
  catch (e) {
    const error = e as Error

    console.error('Error during content analysis:', error)
    throw new Error(`Failed to generate content: ${error.message}`)
  }
}

async function generateCurriculumPlan(params: {
  validatedObjective: CourseObjectiveSchema
  assistantId: string
  threadId: string
  responseFormat: AssistantResponseFormatOption | null | undefined
  useMockupData?: boolean
}): Promise<CoursePlanSchema | undefined> {
  if (params.useMockupData) {
    return mockupCurriculumOutline.plan
  }

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
