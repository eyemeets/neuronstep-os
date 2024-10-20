import type { EducationLevelEnum } from '@repo/shared-enums'
import type { UserLearningPreferences, UserTonePreferences } from '@repo/shared-types'

// Interface for select options
interface SelectOption {
  label: string
  value: string
}

// Main interface for form data structure
export interface FormDataSchema {
  objective: {
    placeholder: string
  }
  explanation: {
    helperText: string
  }
  language: {
    helperText: string
    placeholder: string
    options: SelectOption[] // Select options for language
  }
  education: {
    helperText: string
    placeholder: string
    options: SelectOption[] // Select options for education level
    validation: {
      oneOf: {
        reference: EducationLevelEnum[] // Reference to valid education levels
        message: string
      }
    }
  }
  curriculum: {
    label: string
    helperText: string
    validation: {
      min: {
        reference: number
        message: string
      }
      required: {
        message: string
      }
    }
    placeholder: string
  }
  learningStyle: {
    helperText: string
    placeholder: string
    options: SelectOption[] // Select options for learning style
    validation: {
      oneOf: {
        reference: UserLearningPreferences[] // Reference to valid learning styles
        message: string
      }
    }
  }
  tone: {
    helperText: string
    placeholder: string
    options: SelectOption[] // Select options for tone
    validation: {
      oneOf: {
        reference: UserTonePreferences[] // Reference to valid tones
        message: string
      }
    }
  }
}
