import { CourseObjectiveSchema } from "./course-objective"
import { CourseOutlineSchema } from "./course-outline"
import { CoursePlanSchema } from "./course-plan"

export interface CurriculumPlanAndOutlineStructure {
  plan: CoursePlanSchema
  outline: CourseOutlineSchema
}

export interface CurriculumObjectivePlanAndOutlineStructure extends CurriculumPlanAndOutlineStructure {
  objective: CourseObjectiveSchema
}

export interface KnowledgeGraphData {
  source: string
  target: string
  relationship: string
}