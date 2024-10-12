import { zodResponseFormat } from 'openai/helpers/zod'
import { createGPTCompletion } from '../openai'
import { createUserPrompt, getSubmissionTypeSystemPrompt } from './prompt'
import { ZodSubmissionSchema } from './schema'
import { collections } from 'shared-constants'

import type { UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { CurriculaSubmissionType } from 'shared-types'
import type { UserObjectiveParamsSchema } from 'shared-types'
import { writeToFirestore } from '../firestore'

/**
 * Function to validate if the objective is educational and suitable for curriculum creation
 *
 * todo: Adding a field to capture required prior knowledge can help in sequencing pages more effectively.
 * Encouraging the AI to deconstruct broad objectives into smaller, specific sub-objectives can enhance content granularity.
 * Implementing mechanisms for learners to provide feedback can help in refining the content over time.
 *
 * @param {string} objective - The user's learning objective to analyze
 * @param {CCSubmissionType} submissionType - The type of submission (TEXT, PDF, DESCRIPTION)
 * @returns {Promise<Object>} Object with validation status, reason, objective summary, and potential subject classification
 */
export async function validateLearningObjective(params: UserObjectiveParamsSchema, submissionType: CurriculaSubmissionType, user: UserRecord) {
  const systemPrompt = getSubmissionTypeSystemPrompt(submissionType)

  if (!systemPrompt.length) {
    return false
  }

  const schema = ZodSubmissionSchema({
    curriculum_desc: `The curriculum or educational framework that the user has chosen (${params.curriculum})`,
    friendly_feedback_desc: `Constructive feedback provided in the user's preferred language (${params.language})`,
    education_level_desc: `The educational level chosen by the user (${params.education_level})`,
    tone_desc: `The tone for the curriculum as selected by the user (${params.tone})`,
    learning_style_desc: `Learning styles (${params.learning_style}) that align with the curriculum`
  })

  const userPrompt = createUserPrompt(params)
  const response_format = zodResponseFormat(schema, 'validation_response')
  const completion = await createGPTCompletion(systemPrompt, userPrompt, response_format)

  if (!completion) {
    return false
  }

  let parsedJson

  try {
    parsedJson = JSON.parse(completion)
  }
  catch (error) {
    return false
  }

  try {
    const validatedObjective = schema.parse(parsedJson)

    validatedObjective.curriculum = params.curriculum
    validatedObjective.language = params.language
    validatedObjective.education_level = params.education_level
    validatedObjective.learning_style = params.learning_style
    validatedObjective.user_query = params.objective
    validatedObjective.objective_id = params.objective_id
    const colPath = collections.course.objectives

    await writeToFirestore({
      docId: params.objective_id,
      path: colPath,
      uid: user.uid,
      data: validatedObjective
    })

    return validatedObjective
  }
  catch (validationError) {
    console.error(validationError)
    return false
  }
}
