import type { CourseOutlineSchema, TopicRange, UserLearningPreferences, UserTonePreferences } from '@repo/shared-types'
import { EducationLevelEnum } from '@repo/shared-enums'
import { v4 as uuidv4 } from 'uuid'

// Updated function to match the refined values for different education levels
export function courseDurationRange(level?: EducationLevelEnum): TopicRange {
  switch (level) {
    case EducationLevelEnum.PRESCHOOL:
      return {
        courseLengthInHours: { min: 0.5, max: 2 }, // Shorter learning pages
        minutesPerTopic: { min: 5, max: 15 },
        topics: { min: 2, max: 4 },
        subtopics: { min: 1, max: 2 },
        pagesPerSubtopic: { min: 1, max: 2 },
        totalHours: { min: 0.5, max: 2 }
      }

    case EducationLevelEnum.PRIMARY:
      return {
        courseLengthInHours: { min: 5, max: 10 }, // Weekly cumulative hours
        minutesPerTopic: { min: 10, max: 30 },
        topics: { min: 4, max: 6 },
        subtopics: { min: 2, max: 3 },
        pagesPerSubtopic: { min: 2, max: 3 },
        totalHours: { min: 5, max: 10 }
      }

    case EducationLevelEnum.SECONDARY:
      return {
        courseLengthInHours: { min: 20, max: 50 }, // Semester-long courses
        minutesPerTopic: { min: 30, max: 60 },
        topics: { min: 6, max: 10 },
        subtopics: { min: 3, max: 4 },
        pagesPerSubtopic: { min: 2, max: 4 },
        totalHours: { min: 20, max: 50 }
      }

    case EducationLevelEnum.UNDERGRADUATE:
      return {
        courseLengthInHours: { min: 40, max: 120 },
        minutesPerTopic: { min: 60, max: 90 },
        topics: { min: 8, max: 12 },
        subtopics: { min: 3, max: 5 },
        pagesPerSubtopic: { min: 3, max: 5 },
        totalHours: { min: 40, max: 120 }
      }

    case EducationLevelEnum.GRADUATE:
      return {
        courseLengthInHours: { min: 60, max: 120 },
        minutesPerTopic: { min: 60, max: 90 },
        topics: { min: 10, max: 15 },
        subtopics: { min: 4, max: 6 },
        pagesPerSubtopic: { min: 3, max: 5 },
        totalHours: { min: 60, max: 120 }
      }

    case EducationLevelEnum.DOCTORATE:
      return {
        courseLengthInHours: { min: 100, max: 160 },
        minutesPerTopic: { min: 90, max: 120 },
        topics: { min: 10, max: 20 },
        subtopics: { min: 5, max: 8 },
        pagesPerSubtopic: { min: 4, max: 6 },
        totalHours: { min: 100, max: 160 }
      }

    case EducationLevelEnum.POSTDOCTORAL:
      return {
        courseLengthInHours: { min: 160, max: 200 },
        minutesPerTopic: { min: 90, max: 120 },
        topics: { min: 10, max: 20 },
        subtopics: { min: 6, max: 10 },
        pagesPerSubtopic: { min: 5, max: 7 },
        totalHours: { min: 160, max: 200 }
      }

    default:
      throw new Error('Invalid education level')
  }
}

export function generateContentBasedOnLearningStyle(preferences: UserLearningPreferences) {
  switch (preferences) {
    case 'visual':
      return 'Generate content with rich visuals, diagrams, and video tutorials'
    case 'auditory':
      return 'Generate audio lectures, podcasts, and discussions'
    case 'kinesthetic':
      return 'Generate practical exercises, hands-on projects, and simulations'
    case 'readingWriting':
      return 'Generate detailed reading materials, articles, and quizzes'
    default:
      return 'Provide a balanced mix of content'
  }
}

export function generateLearningStyleDescription(preferences?: UserLearningPreferences): string {
  switch (preferences) {
    case 'visual':
      return 'a visually rich format with diagrams, charts, and video tutorials'
    case 'auditory':
      return 'an auditory-focused format with lectures, podcasts, and discussions'
    case 'kinesthetic':
      return 'a hands-on approach with practical exercises and simulations'
    case 'readingWriting':
      return 'a reading and writing-based approach with articles, textbooks, and written quizzes'
    default:
      return 'a balanced approach incorporating multiple learning styles'
  }
}

export function generateContentBasedOnTone(preferences: UserTonePreferences) {
  switch (preferences) {
    case 'fun':
      return 'Create content with humor, engaging anecdotes, and lighthearted examples'
    case 'serious':
      return 'Generate formal, precise content without humor or distractions'
    case 'academic':
      return 'Provide in-depth analysis with scholarly references and terminology'
    case 'motivational':
      return 'Use positive reinforcement and inspiring language to encourage learning'
    case 'satirical':
      return 'Include witty or ironic comments to provoke thought and critical analysis'
    case 'friendly':
      return 'Adopt a warm, conversational tone with supportive language'
    case 'reflective':
      return 'Ask thought-provoking questions and encourage deeper analysis'
    case 'inspirational':
      return 'Generate content that encourages personal growth and long-term success'
    default:
      return 'Provide a balanced and neutral tone'
  }
}

export function generateToneDescription(preferences?: UserTonePreferences): string {
  switch (preferences) {
    case 'fun':
      return 'a lighthearted and engaging tone with humor and playful examples'
    case 'serious':
      return 'a formal and precise tone without humor or distractions'
    case 'academic':
      return 'an academic tone with in-depth analysis and scholarly references'
    case 'motivational':
      return 'a positive and encouraging tone to inspire the learner'
    case 'satirical':
      return 'a witty and ironic tone to provoke critical thinking'
    case 'friendly':
      return 'a warm, conversational tone with supportive language'
    case 'reflective':
      return 'a reflective tone encouraging deeper analysis and introspection'
    case 'inspirational':
      return 'an inspirational tone focused on personal growth and long-term success'
    default:
      return 'a balanced and neutral tone'
  }
}

// Recursive function to assign IDs at all levels
export function ensureIdsForCourseOutline(curriculumOutline: CourseOutlineSchema): CourseOutlineSchema {
  // Assign an id to the root if it's missing
  curriculumOutline.id = curriculumOutline.id || `course-${uuidv4()}`

  // Iterate over chapters, subtopics, and pages to ensure IDs
  curriculumOutline.chapters = curriculumOutline.chapters.map(chapter => {
    // Assign an ID to the chapter if it's missing
    chapter.id = chapter.id || `chapter-${uuidv4()}`

    // Assign IDs to subtopics
    chapter.subtopics = chapter.subtopics.map(subtopic => {
      // Assign an ID to the subtopic if it's missing
      subtopic.id = subtopic.id || `subtopic-${uuidv4()}`

      // Assign IDs to pages
      subtopic.pages = subtopic.pages.map(page => {
        // Assign an ID to the page if it's missing
        page.id = page.id || `page-${uuidv4()}`

        // Return the updated page
        return page
      })

      // Return the updated subtopic
      return subtopic
    })

    // Return the updated chapter
    return chapter
  })

  return curriculumOutline
}

// Helper type guard to check if curriculumOutline conforms to CourseOutlineSchema
export function isCourseOutlineSchema(outline: any): outline is CourseOutlineSchema {
  return (
    typeof outline.id === 'string' && !outline.id.length &&
    Array.isArray(outline.chapters) &&
    outline.chapters.every((chapter: any) => typeof chapter.id === 'string' || typeof chapter.id === 'undefined')
  )
}
