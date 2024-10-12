import { ContentTypeEnum } from "index"

export interface CourseOutlineSchema {
  id: string
  title: string
  description: string
  image_prompt?: string // Add image_prompt to course-level
  chapters: CourseOutlineChapterSchema[]
  assistantId?: string
  threadId?: string
}

export interface CourseOutlineChapterSchema {
  id: string
  topic: string
  image_prompt?: string // Add image_prompt to topic-level
  subtopics: CourseOutlineSubtopicSchema[]
}

export interface CourseOutlineSubtopicSchema {
  id: string
  subtopic: string
  image_prompt?: string // Add image_prompt to subtopic-level
  pages: CourseOutlinePageSchema[]
}

export interface CourseOutlinePageSchema {
  id: string
  block_title: string
  content_type: ContentTypeEnum
  description: string
  estimated_time: string
  content?: string
  image_prompt?: string // Add image_prompt to page-level if needed
}

export interface TopicRange {
  courseLengthInHours: { min: number; max: number }
  minutesPerTopic: { min: number; max: number }
  topics: { min: number; max: number }
  subtopics: { min: number; max: number }
  pagesPerSubtopic: { min: number; max: number }
  totalHours: { min: number; max: number }
}
