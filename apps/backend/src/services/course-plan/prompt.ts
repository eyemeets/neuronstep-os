import type { CourseObjectiveSchema } from '@repo/shared-types'
import { courseDurationRange, generateLearningStyleDescription, generateToneDescription } from '../../utils/curricula'

export function createUserPromptForCurriculumPlan(params: CourseObjectiveSchema) {
  const {
    content_description,
    sub_learning_objectives = [],
    education_level,
    learning_outcomes = [],
    skills_21st_century = [],
    estimated_time_to_complete,
    estimated_timeframe,
    complexity_score,
    bloom_taxonomy_level,
    recommended_learning_frameworks = [],
    learning_style = [],
    prerequisites = [],
    adaptive_learning_recommendations,
    assessment_methods = [],
    engagement_strategies = [],
    potential_challenges,
    mitigation_strategies,
    expected_competencies = [],
    practical_application_details,
    cognitive_load_assessment,
    mastery_learning_applicability,
    UDL_compliance,
    standard_classification,
    personalization_options,
    curriculum
  } = params
  const courseDetails = courseDurationRange(education_level)
  const learningStyle = generateLearningStyleDescription(params.learning_style)
  const tone = generateToneDescription(params.tone)

  return `
  Based on the following validated learning objective and its details, create a high-level curriculum overview.

  The user prefers to follow the curriculum of school / university / educational institution "${curriculum}"

  The user prefers the course to be at the ${education_level} level, which means the course will cover:

  - **Total hours**: Between ${courseDetails.totalHours.min} and ${courseDetails.totalHours.max} hours.
  - **Topics**: Between ${courseDetails.topics.min} and ${courseDetails.topics.max} main topics.
  - **Subtopics per topic**: Between ${courseDetails.subtopics.min} and ${courseDetails.subtopics.max} subtopics per topic.
  - **Content pages per subtopic**: Between ${courseDetails.pagesPerSubtopic.min} and ${courseDetails.pagesPerSubtopic.max} content pages for each subtopic.
  
  The user has selected the **"${params.learning_style}"** learning style, so content should be adapted to: "${learningStyle}".
  The user prefers the tone to be **"${params.tone}"**, so content should be generated in a **"${tone}"** tone.

  Please write in the user's language (${params.language}) when filling out the JSON schema.
 
  The user's Language is "${params.language || 'en-US'}",

  **Learning Objective Description:**
  "${content_description}"

  **Sub-Learning Objectives:**
  ${sub_learning_objectives.length > 0 ? sub_learning_objectives.map((sub, index) => `\\${index + 1}. \\${sub}\\`).join('\n') : 'N/A'}

  **Educational Level:**
  "${education_level}"

  **Learning Outcomes:**
  ${learning_outcomes.length > 0 ? learning_outcomes.map((outcome, index) => `\\${index + 1}. \\${outcome}\\`).join('\n') : 'N/A'}

  **21st-Century Skills:**
  ${skills_21st_century.length > 0 ? skills_21st_century.join(', ') : 'N/A'}

  **Prerequisites:**
  ${prerequisites.length > 0 ? prerequisites.join(', ') : 'N/A'}

  **Estimated Time to Complete:**
  "${estimated_time_to_complete}" (Approximately ${estimated_timeframe} hours)

  **Complexity Score:**
  ${complexity_score} out of 100

  **Bloom's Taxonomy Level:**
  "${bloom_taxonomy_level}"

  **Recommended Learning Frameworks:**
  ${recommended_learning_frameworks.length > 0 ? recommended_learning_frameworks.join(', ') : 'N/A'}

  **Learning Style Alignment:**
  ${learning_style.length > 0 ? learning_style : 'N/A'}

  **Adaptive Learning Recommendations:**
  "${adaptive_learning_recommendations}"

  **Assessment Methods:**
  ${assessment_methods.length > 0 ? assessment_methods.join(', ') : 'N/A'}

  **Engagement Strategies:**
  ${engagement_strategies.length > 0 ? engagement_strategies.join(', ') : 'N/A'}

  **Potential Challenges:**
  "${potential_challenges}"

  **Mitigation Strategies:**
  "${mitigation_strategies}"

  **Expected Competencies:**
  ${expected_competencies.length > 0 ? expected_competencies.join('\n') : 'N/A'}

  **Practical Application Details:**
  "${practical_application_details}"

  **Cognitive Load Assessment:**
  "${cognitive_load_assessment}"

  **Mastery Learning Applicability:**
  "${mastery_learning_applicability ? 'Yes' : 'No'}"

  **Universal Design for Learning (UDL) Compliance:**
  "${UDL_compliance ? 'Yes' : 'No'}"

  **Standard Classification:**
  Code: "${standard_classification.code}"
  Description: "${standard_classification.description}"

  **Personalization Options:**
  "${personalization_options}"

  **Tasks:**

  - Develop a high-level curriculum overview based on the validated learning objective.
  - Provide an estimated total number of hours required to complete the curriculum.
  - Determine the appropriate number of main topics (without specifying them) needed to cover the learning objectives.
  - Outline the key focus areas and high-level learning objectives.
  - Describe the overall approach and structure of the curriculum.
  - Include strategies for assessment, engagement, and adaptive learning.
  - Consider the complexity, educational level, learning outcomes, and other details provided.
  - Ensure that the plan aligns with the estimated time to complete and provides a balanced distribution of content.
  - Provide specific fields that can be used by other AI agents for further processing.

  **Note:** Do not include specific topics or subtopics in the plan.

  **Provide your response as a JSON object with the following structure:**

  {
    "title": string
    "description": "50 - 100 words about the curriculum"
    "estimated_total_minutes": ${params.estimated_timeframe},
    "number_of_main_topics": number (Between ${courseDetails.topics.min} and ${courseDetails.topics.max} main topics),
    "number_of_sub_topics": number (Between ${courseDetails.subtopics.min} and ${courseDetails.subtopics.max} subtopics per topic.),
    "number_of_pages": number (Between ${courseDetails.pagesPerSubtopic.min} and ${courseDetails.pagesPerSubtopic.max} content pages for each subtopic),
    "learning_objectives": ["Objective 1", "Objective 2", ...],
    "key_focus_areas": ["Focus area 1", "Focus area 2", ...],
    "approach_and_structure": "Description of the overall approach and structure",
    "assessment_strategy": "Description of how assessments will be integrated",
    "engagement_strategy": "Description of how engagement strategies will be incorporated",
    "adaptive_learning_strategy": "Description of how adaptive learning will be implemented",
    "prerequisites": ["Prerequisite 1", "Prerequisite 2", ...],
    "learning_frameworks": ["Framework 1", "Framework 2", ...],
    "UDL_compliance": true/false,
    "mastery_learning_applicability": true/false,
    "personalization_options": "Description of how personalization will be offered",
    "lang": "ISO 639-1 language code (e.g., 'en' for English)",
    "languageName": "Human-readable language name (e.g., 'English')",
    "countryCode": "ISO 3166-1 alpha-2 country code (e.g., 'US' for United States)",
    "countryName": "Human-readable country name (e.g., 'United States')",
    "education_level": ${params.education_level},
    "tone": "${params.tone}"
  }

  **Ensure that your response is in valid JSON format and conforms to the schema provided. Do not include any explanations or additional text outside the JSON response.`
}
