export enum CurriculaSubmissionType {
  TEXT = 'text',
  PDF = 'pdf',
  DESCRIPTION = 'description'
}

export enum EducationLevel {
  PRESCHOOL = 'preschool',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  UNDERGRADUATE = 'undergraduate',
  GRADUATE = 'graduate',
  DOCTORATE = 'doctorate',
  POSTDOCTORAL = 'postdoctoral'
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

// Interface for the course length, topic ranges, subtopics, pages, and total hours
export interface TopicRange {
  courseLengthInHours: { min: number; max: number }
  minutesPerTopic: { min: number; max: number }
  topics: { min: number; max: number }
  subtopics: { min: number; max: number }
  pagesPerSubtopic: { min: number; max: number }
  totalHours: { min: number; max: number }
}

export interface ImageTheme {
  theme: 'cinematic' | '3D' | 'abstract' | 'surreal' | 'minimalistic'
  tone: 'realistic' | 'artistic' | 'minimalistic' | 'futuristic' | 'technical'
  style?: 'photorealistic' | 'illustrative' | 'schematic' | 'digital' | 'hand-drawn' // Optional
  complexity?: 'simple' | 'detailed' | 'elaborate' | 'complex' | 'minimal' // Optional
  resolution?: 'low' | 'medium' | 'high' | 'ultra' // Optional
  color_scheme?: 'monochromatic' | 'vibrant' | 'pastel' | 'neutral' | 'dark' | 'bright' // Optional
  theme_description: string // Required field for content description
  environment: string
  // Additional fields
  mood: 'calm' | 'energetic' | 'dramatic' | 'mysterious' | 'inspiring' | 'melancholic' | 'uplifting'
  lighting?: 'natural' | 'artificial' | 'soft' | 'bright' | 'shadowy' | 'dramatic' | 'low-light' // Optional
  focus?: 'wide' | 'close-up' | 'medium-shot' | 'panorama' // Optional
  composition?: 'balanced' | 'asymmetrical' | 'minimal' | 'complex' // Optional
  background?: 'simple' | 'complex' | 'blurred' | 'sharp' | 'transparent' // Optional
  texture?: 'smooth' | 'rough' | 'glossy' | 'matte' | 'gritty' // Optional
  contrast?: 'high' | 'low' | 'normal' // Optional
  depth_of_field?: 'shallow' | 'deep' | 'normal' // Optional
  framing?: 'central' | 'rule-of-thirds' | 'symmetrical' | 'dynamic' // Optional
  shadows?: 'strong' | 'subtle' | 'none' // Optional
  saturation?: 'high' | 'low' | 'normal' // Optional
  viewpoint?: 'bird’s eye' | 'eye level' | 'worm’s eye' | 'tilted' // Optional
}

export interface ValidateObjectiveUserData {
  lang: string
  objective: string
  education_level: EducationLevel
  curriculum: string
  learning_style: UserLearningPreferences
  tone: UserTonePreferences
  outcome: string
  age: number
  frameworks: string[]
  timeframe: number
  file: File
}

export interface ValidatedObjective {
  user_query: string
  title: string
  course_description: string
  use_mockup_data?: boolean
  assistant_id?: string
  threadId?: string
  valid: boolean
  lang?: string
  language_name?: string
  country_code?: string
  country_name?: string
  reason: string
  friendly_feedback: string
  content_description: string
  objective_match: boolean
  relevance_score: number
  complexity_score: number
  educational_level: EducationLevel
  missing_information: string[]
  ethical_compliance: boolean
  ethical_compliance_details: string
  learning_outcomes: string[]
  suitability_for_adaptive_learning: number
  adaptive_learning_recommendations: string
  practical_application_score: number
  practical_application_details: string
  SMART_goal_check: boolean
  SMART_criteria: {
    specific: boolean
    measurable: boolean
    achievable: boolean
    relevant: boolean
    time_bound: boolean
  }
  bloom_taxonomy_level: string
  bloom_taxonomy_reasoning: string
  cognitive_load_assessment: string
  mastery_learning_applicability: boolean
  UDL_compliance: boolean
  skills_21st_century: string[]
  standard_classification: {
    code: string
    description: string
  }
  recommended_learning_frameworks: string[]
  learning_style_alignment: string[]
  sub_learning_objectives: string[]
  prerequisites: string[]
  estimated_time_to_complete: string
  recommended_content_types: string[]
  potential_challenges: string
  assessment_methods: string[]
  expected_competencies: string[]
  personalization_options: string
  engagement_strategies: string[]
  estimated_timeframe: number
  timeframe_adjustment_reasoning: string
  mitigation_strategies: string
  file?: File
  curriculum: string
  learning_style: UserLearningPreferences
  tone: UserTonePreferences
  image_theme: ImageTheme
  visual_elements: string[]
}

export interface ContentBlock {
  block_title: string
  content_type: string
  description: string
  estimated_time: string
}

export interface KnowledgeGraphData {
  source: string
  target: string
  relationship: string
}

export type UserLearningPreferences = 'visual' | 'auditory' | 'kinesthetic' | 'readingWriting'

export type UserTonePreferences = 'fun' | 'serious' | 'academic' | 'motivational' | 'satirical' | 'friendly' | 'reflective' | 'inspirational'

export interface CurriculumPlan {
  title: string // Title of the curriculum
  description: string // 50-100 words about the curriculum
  estimated_total_minutes: number // The total estimated hours for the course
  number_of_main_topics: number // Number of main topics (based on courseDetails.topics)
  number_of_sub_topics: number // Number of subtopics per topic (based on courseDetails.subtopics)
  number_of_pages: number // Number of content pages per subtopic (based on courseDetails.pagesPerSubtopic)
  learning_objectives: string[] // Learning objectives for the course
  key_focus_areas: string[] // Key focus areas for the course
  approach_and_structure: string // Overall approach and structure of the course
  assessment_strategy: string // How assessments will be integrated
  engagement_strategy: string // How engagement strategies will be incorporated
  adaptive_learning_strategy: string // How adaptive learning will be implemented
  prerequisites: string[] // List of prerequisites
  learning_frameworks: string[] // Recommended learning frameworks
  UDL_compliance: boolean // Universal Design for Learning compliance
  mastery_learning_applicability: boolean // Mastery learning applicability
  personalization_options: string // Description of how personalization will be offered
  lang: string // ISO 639-1 language code (e.g., 'en' for English)
  languageName: string // Human-readable language name (e.g., 'English')
  countryCode: string // ISO 3166-1 alpha-2 country code (e.g., 'US' for United States)
  countryName: string // Human-readable country name (e.g., 'United States')
  educational_level: string // Educational level (e.g., undergraduate, graduate)
  tone: string // Tone for the curriculum (e.g., academic, fun)
  assistantId?: string
  threadId?: string
}

export interface CurriculumOutlineSchema {
  id: string
  title: string
  description: string
  image_prompt?: string // Add image_prompt to course-level
  chapters: {
    id: string
    topic: string
    image_prompt?: string // Add image_prompt to topic-level
    subtopics: {
      id: string
      subtopic: string
      image_prompt?: string // Add image_prompt to subtopic-level
      pages: {
        id: string
        block_title: string
        content_type: ContentTypeEnum
        description: string
        estimated_time: string
        content?: string
        image_prompt?: string // Add image_prompt to page-level if needed
      }[]
    }[]
  }[]
  assistantId?: string
  threadId?: string
}

export interface CurriculumPlanAndOutlineStructure {
  plan: CurriculumPlan
  outline: CurriculumOutlineSchema
}

export interface CurriculumObjectivePlanAndOutlineStructure extends CurriculumPlanAndOutlineStructure {
  objective: ValidatedObjective
}
