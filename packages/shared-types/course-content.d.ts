import type { 
  CourseOutlineSchema, 
  CourseOutlineChapterSchema, 
  CourseOutlineSubtopicSchema, 
  CourseOutlinePageSchema 
} from './course-outline'

// Extend the base CourseOutlineSchema for content-specific schema
export interface CourseContentSchema extends CourseOutlineSchema {
  chapters: CourseContentChapterSchema[] // Override to use content chapters
}

// Extend CourseOutlineChapterSchema for content-specific chapter schema
export interface CourseContentChapterSchema extends CourseOutlineChapterSchema {
  subtopics: CourseContentSubtopicSchema[] // Override to use content subtopics
}

// Extend CourseOutlineSubtopicSchema for content-specific subtopic schema
export interface CourseContentSubtopicSchema extends CourseOutlineSubtopicSchema {
  pages: CourseContentPageSchema[] // Override to use content pages
}

// Extend CourseOutlinePageSchema for content-specific page schema
export interface CourseContentPageSchema extends CourseOutlinePageSchema {
  content?: CourseContentSchema[] // Add for content pages
}

// Define a new interface for detailed content 
export interface CourseContentSchema {
  id: string
  heading?: string // Optional heading for the section
  paragraph?: string // Optional paragraph for the section
  media?: CourseContentMediaSchema[] // Optional array for media items
  interactive?: CourseInteractiveContentSchema[] // Optional interactive elements like quizzes
}

// Media schema for course content (images, videos, etc.)
export interface CourseContentMediaSchema {
  id: string
  type: 'image' | 'audio' | 'video'
  src: string // URL to the media file
  alt_text?: string // Optional alt text for accessibility
}

// Interactive content schema (quizzes, exercises, etc.)
export interface CourseInteractiveContentSchema {
  id: string
  type: 'quiz' | 'exercise' | 'discussion'
  instructions: string
  options?: CourseInteractiveOptionSchema[] // Quiz or exercise options
}

// Options for quizzes or exercises
export interface CourseInteractiveOptionSchema {
  id: string
  label: string
  isCorrect: boolean // Marks if this option is the correct one
}
