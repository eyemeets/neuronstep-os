import { EducationLevel } from "index"

export interface ZodCustomUserSchemaParams {
  curriculum_desc: string
  friendly_feedback_desc: string
  education_level_desc: string
  tone_desc: string
  learning_style_desc: string
}

export interface UserObjectiveParamsSchema {
  language?: string
  objective: string
  education_level?: EducationLevel
  curriculum?: string
  learning_style?: UserLearningPreferences
  tone?: UserTonePreferences
  outcome?: string
  age?: number
  frameworks?: string[]
  timeframe?: number
  file?: File
}

export interface CourseObjectiveSchema {
  uid?: string
  user_query: string
  title: string
  course_description: string
  use_mockup_data?: boolean
  assistant_id?: string
  threadId?: string
  valid: boolean
  language?: string
  language_name?: string
  country_code?: string
  country_name?: string
  reason: string
  friendly_feedback: string
  content_description: string
  objective_match: boolean
  relevance_score: number
  complexity_score: number
  education_level: EducationLevel
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
  learning_style: UserLearningPreferences
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
  tone: UserTonePreferences
  image_theme?: ImageTheme
  visual_elements?: string[]
}

export type UserLearningPreferences = 'visual' | 'auditory' | 'kinesthetic' | 'readingWriting'

export type UserTonePreferences = 'fun' | 'serious' | 'academic' | 'motivational' | 'satirical' | 'friendly' | 'reflective' | 'inspirational'

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