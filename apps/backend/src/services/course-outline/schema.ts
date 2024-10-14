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
          img_prompt: z.string(),
          img_url: z.string().optional().describe('Leave this field empty'),
          pages: z.array(
            z.object({
              id: z.string().describe('Leave this field empty'),
              block_title: z.string(),
              content_type: z.nativeEnum(ContentTypeEnum), // Using the defined enum for content type
              description: z.string(),
              estimated_time: z.string(),
              content: z.string().optional(),
              img_prompt: z.string()
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
  title: '', // Title of the course, to be populated later
  description: '', // Description of the course, to be populated later
  img_prompt: '', // Optional course-level image prompt
  img_url: '',
  chapters: [
    {
      id: '',
      topic: '', // Topic of the chapter, to be populated later
      img_prompt: '', // Optional image prompt for the chapter
      subtopics: [
        {
          id: '',
          subtopic: '', // Subtopic name, to be populated later
          img_prompt: '', // Optional image prompt for the subtopic
          pages: [
            {
              id: '',
              block_title: '', // Title of the page, to be populated later
              content_type: '' as ContentTypeEnum, // Content type, e.g., 'text', 'video', etc.
              description: '', // Description of the page
              estimated_time: '', // Estimated time for the content
              content: '', // Optional content for the page
              img_prompt: '' // Optional image prompt for the page
            }
          ],
          img_url: ''
        }
      ],
      img_url: ''
    }
  ],
  assistantId: '', // Optional assistantId
  threadId: '' // Optional threadId
}
