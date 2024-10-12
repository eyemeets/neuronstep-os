import type { CourseObjectiveSchema, CoursePlanSchema, CourseOutlineSchema } from '@repo/shared-types'
import { create } from 'zustand'

interface CurriculumStore {
  objective: CourseObjectiveSchema | null
  plan: CoursePlanSchema | null
  outline: CourseOutlineSchema | null
  setObjective: (objective: CourseObjectiveSchema) => void
  setPlan: (plan: CoursePlanSchema) => void
  setOutline: (outline: CourseOutlineSchema) => void
}

export const useCurriculumStore = create<CurriculumStore>((set) => ({
  objective: null,
  plan: null,
  outline: null,
  setObjective: (objective) => set({ objective }),
  setPlan: (plan) => set({ plan }),
  setOutline: (outline) => set({ outline })
}))
