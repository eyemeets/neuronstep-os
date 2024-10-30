import { EducationLevelEnum } from '@repo/shared-enums'
import type { FormDataSchema } from './types'
import * as yup from 'yup'

export const data: FormDataSchema = {
  objective: {
    placeholder: 'I want to learn about...'
  },
  explanation: {
    helperText: 'These fields are optional but will help tailor the course content to your needs, creating a more personalized and effective learning experience based on your background and preferences.'
  },
  language: {
    helperText: 'e.g., English (en-US), Norwegian (nb-NO)',
    placeholder: 'Select a language',
    options: [
      { label: 'English (en-US)', value: 'en-US' },
      { label: 'Norwegian (nb-NO)', value: 'nb-NO' }
    ]
  },
  education: {
    helperText: 'Preschool, Primary, Secondary, Undergraduate, Graduate, Doctorate, Postdoctoral',
    placeholder: 'Select an education level',
    options: [
      { label: 'Preschool', value: 'preschool' },
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Undergraduate', value: 'undergraduate' },
      { label: 'Graduate', value: 'graduate' },
      { label: 'Doctorate', value: 'doctorate' },
      { label: 'Postdoctoral', value: 'postdoctoral' }
    ],
    validation: {
      oneOf: {
        reference: [
          EducationLevelEnum.PRESCHOOL,
          EducationLevelEnum.PRIMARY,
          EducationLevelEnum.SECONDARY,
          EducationLevelEnum.UNDERGRADUATE,
          EducationLevelEnum.GRADUATE,
          EducationLevelEnum.DOCTORATE,
          EducationLevelEnum.POSTDOCTORAL
        ],
        message: 'Invalid education level'
      } 
    }
  },
  curriculum: {
    label: 'Curriculum',
    helperText: 'Enter the name of your school or university to match the curriculum style',
    validation: {
      min: {
        reference: 10,
        message: 'Objective must be at least 10 characters'
      },
      required: {
        message: 'Objective is required'
      }
    },
    placeholder: 'Enter Curriculum'
  },
  learningStyle: {
    helperText: 'Visual, Auditory, Kinesthetic, Reading/Writing',
    placeholder: 'Select Learning Style',
    options: [
      { label: 'Visual', value: 'visual' },
      { label: 'Auditory', value: 'auditory' },
      { label: 'Kinesthetic', value: 'kinesthetic' },
      { label: 'Reading/Writing', value: 'readingWriting' }
    ],
    validation: {
      oneOf: {
        reference: [
          'visual',
          'auditory',
          'kinesthetic',
          'readingWriting'
        ],
        message: 'Invalid learning style'
      }
    }
  },
  tone: {
    helperText: 'Fun, Serious, Academic, Motivational, Satirical, Friendly, Reflective, Inspirational',
    placeholder: 'Select Tone',
    options: [
      { label: 'Fun', value: 'fun' },
      { label: 'Serious', value: 'serious' },
      { label: 'Academic', value: 'academic' },
      { label: 'Motivational', value: 'motivational' },
      { label: 'Satirical', value: 'satirical' },
      { label: 'Friendly', value: 'friendly' },
      { label: 'Reflective', value: 'reflective' },
      { label: 'Inspirational', value: 'inspirational' }
    ],
    validation: {
      oneOf: {
        reference: [
          'fun',
          'serious',
          'academic',
          'motivational',
          'satirical',
          'friendly',
          'reflective',
          'inspirational'
        ],
        message: 'Invalid tone preference'
      }
    }
  }
}

// Define validation schema using yup
export const promptSchema = yup.object().shape({
  curriculum: yup.string().optional(),
  objective: yup
    .string()
    .min(
      data.curriculum.validation.min.reference, 
      data.curriculum.validation.min.message
    )
    .required(data.curriculum.validation.required.message),
  language: yup.string().optional(),
  education_level: yup
    .string()
    .oneOf(
      data.education.validation.oneOf.reference, 
      data.education.validation.oneOf.message
    )
    .optional(),
  learning_style: yup
    .string()
    .oneOf(
      data.learningStyle.validation.oneOf.reference, 
      data.learningStyle.validation.oneOf.message
    )
    .optional(),
  tone: yup
    .string()
    .oneOf(
      data.tone.validation.oneOf.reference, 
      data.tone.validation.oneOf.message
    )
    .optional()
})
