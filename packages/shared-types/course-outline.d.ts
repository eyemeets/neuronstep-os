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

export enum ContentTypeEnum {
  TEXT_ARTICLE = 'text_article', // Traditional text-based content
  VIDEO = 'video', // Video content
  AUDIO = 'audio', // Audio content like podcasts or lectures
  QUIZ = 'quiz', // Quiz or assessment content
  INTERACTIVE_EXERCISE = 'interactive_exercise', // Interactive activities or exercises
  DISCUSSION = 'discussion', // Discussion-based content or prompts
  CASE_STUDY = 'case_study', // Case study examples or exercises
  INFOGRAPHIC = 'infographic', // Visual infographic content
  PDF = 'pdf', // PDF files or downloadable content
  IMAGE_GALLERY = 'image_gallery', // Image or photo galleries
  SIMULATION = 'simulation', // Simulated environments or tasks
  CODING_EXERCISE = 'coding_exercise', // Programming exercises
  DIAGRAM = 'diagram', // Diagrams or visual flowcharts
  TUTORIAL = 'tutorial', // Step-by-step tutorials
  WORKSHEET = 'worksheet', // Downloadable worksheets
  SURVEY = 'survey', // Surveys or feedback forms
  ROLE_PLAY = 'role_play', // Role-playing exercises
  PRESENTATION = 'presentation', // Slides or presentations
  ANIMATION = 'animation', // Animation-based content
  FLASHCARDS = 'flashcards', // Flashcard-based learning
  TABLE = 'table', // Tables or structured data
  TIMELINE = 'timeline', // Timelines of events or processes
  WEB_LINK = 'web_link', // External web links
  GAME = 'game', // Educational games
  PODCAST = 'podcast', // Audio podcast series
  RESEARCH_PAPER = 'research_paper', // Long-form research or academic papers
  NOTE = 'note', // Short notes or bullet points
  POLL = 'poll' // Polls or opinion collection
}

export interface TopicRange {
  courseLengthInHours: { min: number; max: number }
  minutesPerTopic: { min: number; max: number }
  topics: { min: number; max: number }
  subtopics: { min: number; max: number }
  pagesPerSubtopic: { min: number; max: number }
  totalHours: { min: number; max: number }
}
