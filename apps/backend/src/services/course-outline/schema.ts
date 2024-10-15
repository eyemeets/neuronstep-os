import { z } from 'zod'
import { ContentTypeEnum } from '@repo/shared-enums'
import type { CourseOutlineSchema } from '@repo/shared-types'

export const ZodCourseOutlineSchema = z.object({
  id: z.string().describe('Leave this field empty'),
  title: z.string(),
  description: z.string(),
  img_prompt: z.string(),
  img_url: z.string().optional(),
  chapters: z.array(
    z.object({
      id: z.string().describe('Leave this field empty'),
      topic: z.string(),
      img_prompt: z.string(),
      img_url: z.string().optional().describe('Leave this field empty'),
      subtopics: z.array(
        z.object({
          id: z.string().describe('Leave this field empty'),
          subtopic: z.string(),
          pages: z.array(
            z.object({
              id: z.string().describe('Leave this field empty'),
              block_title: z.string(),
              content_type: z.nativeEnum(ContentTypeEnum), // Using the defined enum for content type
              description: z.string(),
              estimated_time: z.string(),
              content: z.string().optional()
            })
          )
        })
      )
    })
  ),
  assistantId: z.string().optional(),
  threadId: z.string().optional()
})


export const emptyCourseOutlineSchema: CourseOutlineSchema = {
  id: '',
  title: '',
  description: '',
  img_prompt: '',
  img_url: '',
  assistant_id: '',
  thread_id: '',
  chapters: [
    {
      id: '',
      topic: '',
      img_prompt: '',
      img_url: '',
      subtopics: [
        {
          id: '',
          subtopic: '',
          pages: [
            {
              id: '',
              block_title: '',
              content_type: '' as ContentTypeEnum, // Content type, e.g., 'text', 'video', etc.
              description: '',
              estimated_time: '',
              content: ''
            }
          ]
        }
      ]
    }
  ]
}
