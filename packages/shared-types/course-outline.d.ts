import type { ContentTypeEnum } from 'shared-enums'

export interface CourseOutlineSchema {
  id: string
  title: string
  description: string
  img_prompt: string
  img_url?: string
  chapters: CourseOutlineChapterSchema[]
  assistant_id?: string
  thread_id?: string
}

export interface CourseOutlineChapterSchema {
  id: string
  topic: string
  img_prompt: string
  img_url?: string
  subtopics: CourseOutlineSubtopicSchema[]
}

export interface CourseOutlineSubtopicSchema {
  id: string
  subtopic: string
  pages: CourseOutlinePageSchema[]
}

export interface CourseOutlinePageSchema {
  id: string
  block_title: string
  content_type: ContentTypeEnum
  description: string
  estimated_time: string
  content?: string
}

export interface TopicRange {
  courseLengthInHours: { min: number; max: number }
  minutesPerTopic: { min: number; max: number }
  topics: { min: number; max: number }
  subtopics: { min: number; max: number }
  pagesPerSubtopic: { min: number; max: number }
  totalHours: { min: number; max: number }
}
