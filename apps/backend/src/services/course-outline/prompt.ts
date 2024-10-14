import type { CoursePlanSchema, CourseObjectiveSchema } from '@repo/shared-types'

export function createUserPromptForCourseOutlineSchema(params: CourseObjectiveSchema, curriculumPlan: CoursePlanSchema) {
  const numberOfTopics = curriculumPlan.number_of_main_topics
  const numberOfSubTopics = curriculumPlan.number_of_sub_topics
  const numberOfPages = curriculumPlan.number_of_pages

  return `
  Based on the following curriculum plan and validated learning objective, generate a comprehensive educational outline that includes main topics, subtopics, and content pages. 
  Ensure that the structure fits within the estimated timeframe of "${params.estimated_time_to_complete}" hour(s) (approximately ${params.estimated_timeframe} hours).

  **Curriculum Plan:**
  ${JSON.stringify(curriculumPlan, null, 2)}

  **Learning Objective Description:**
  ${params.content_description}

  **Tasks:**
  - Identify minimum ${numberOfTopics} main topics that align with the curriculum plan.
  - For each main topic, generate minimum ${numberOfSubTopics} subtopics.
  - For each subtopic, generate a minimum of ${numberOfPages} content pages.
    - Each page should be a distinct block of content, ensuring brevity and clarity.
    - Each page should have an "estimated_time" not exceeding 5 minutes.
    - If the content for a single page exceeds 5 minutes, split it into multiple pages. The continuation of a page should indicate it's a continuation (e.g., "Page Title 1.1.1 - Continued").
  - Ensure that the total estimated time for all topics, subtopics, content pages, and paragraphs aligns with the overall estimated timeframe.
  - Ensure that the topics, subtopics, content pages, and paragraphs comprehensively cover all aspects of the learning objective.
  - Ensure that each "title" corresponds to a concise and focused piece of content.
  - Divide subtopics into multiple content pages to maintain brevity and prevent information overload.

  **Provide your response as a JSON object with the following structure:**

  {
    "title": "Course Title",
    "description": "50 - 100 words about the curriculum.",
    "img_prompt": ""
    "chapters": [
      {
        "topic": "Main Topic 1",
        "img_prompt": ""
        "subtopics": [
          {
            "id": "1"
            "subtopic": "Subtopic 1.1",
            "img_prompt": ""
            "pages": [
              {
                "id": "1",
                "title": "Page Title 1.1.1",
                "content_type": "Content Type",
                "description": "Description of the content block.",
                "estimated_time": number,
                "content": string (Empty string)
              },
              {
                "id": "2",
                "title": "Page Title 1.1.2",
                "content_type": "Content Type",
                "description": "Description of the content block.",
                "estimated_time": number,
                "content": string (Empty string)
              }
              // Ensure at least ${numberOfPages} pages per subtopic
            ]
          }
          // Additional subtopics...
        ]
      }
      // Additional main topics...
    ]
  }

  **Ensure that your response is in valid JSON format and conforms to the schema provided. Do not include any explanations or additional text outside the JSON response.`
}
