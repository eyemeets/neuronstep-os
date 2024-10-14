import { CourseObjectiveSchema } from "./course-objective"
import { CourseOutlineSchema } from "./course-outline"
import { CoursePlanSchema } from "./course-plan"

export interface CourseObjectiveAndPlanParams {
  objective: CourseObjectiveSchema
  plan: CoursePlanSchema
}

export interface CoursePlanAndOutlineParams {
  plan: CoursePlanSchema
  outline: CourseOutlineSchema
}

export interface CourseGenStructure extends CoursePlanAndOutlineParams {
  objective: CourseObjectiveSchema
}

export interface KnowledgeGraphData {
  source: string
  target: string
  relationship: string
}