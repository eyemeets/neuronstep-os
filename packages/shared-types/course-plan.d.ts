export interface CoursePlanSchema {
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