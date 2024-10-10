import type { ValidatedObjective, CurriculumPlan, CurriculumOutlineSchema } from '@/types/curricula'
import { create } from 'zustand'

interface CurriculumStore {
  objective: ValidatedObjective | null
  plan: CurriculumPlan | null
  outline: CurriculumOutlineSchema | null
  setObjective: (objective: ValidatedObjective) => void
  setPlan: (plan: CurriculumPlan) => void
  setOutline: (outline: CurriculumOutlineSchema) => void
}

export const useCurriculumStore = create<CurriculumStore>((set) => ({
  objective: null,
  plan: null,
  outline: null,
  setObjective: (objective) => set({ objective }),
  setPlan: (plan) => set({ plan }),
  setOutline: (outline) => set({ outline })
}))
