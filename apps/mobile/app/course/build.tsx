import React from 'react'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { useUiStore } from '@/stores/user-ui'
import SlideUpPanel from '@/components/molecules/SlideUpPanel'
import Text from '@/components/atoms/Text'
import View from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { createCourseOutline } from '@/services/course/create-outline'
import { createCourseContent } from '@/services/course/create-content'
import type { CourseGenStructure, CourseObjectiveAndPlanParams, CourseObjectiveSchema, UserObjectiveParamsSchema } from '@repo/shared-types'
import { createCoursePlan } from '@/services/course/create-plan'
import { createCourseObjective } from '@/services/course/create-objective'
import type { RouteProp } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

type RouteBuildProps = RouteProp<{ form: UserObjectiveParamsSchema }, 'form'>

const RootLayout = () => {
  const uiStore = useUiStore()
  const navigation = useTypedNavigation()
  const route = useRoute<RouteBuildProps>()

  const form = route.params;

  (async () => {
    // Create the objective
    const objective = await createCourseObjective({ data: JSON.stringify(form) })

    if (!objective) throw new Error('Objective is undefined')

    useCurriculumStore.getState().setObjective(objective)

    if (!objective?.valid) {
      uiStore.toggleObjectiveInvalidPanel()
      return
    }

    // Create the plan
    const plan = await createCoursePlan(objective)
  
    if (!plan) return
    useCurriculumStore.getState().setPlan(plan)

    // Create the outline
    const outline = await createCourseOutline({ objective, plan })

    if (!outline) return
    useCurriculumStore.getState().setOutline(outline)

    const data: CourseGenStructure = {
      objective,
      plan,
      outline
    }

    // Create the content
    // Send a new request to create the content
    const content = await createCourseContent(data)

    if (!content) return
    useCurriculumStore.getState().setOutline(content)

    // Navigate to the course overview
    navigation.navigate('course', {
      screen: 'overview',
      plan
    })
              
  })()

  return (
    <View>
      <Text>Build the course</Text>
    </View>
  )
}

export default RootLayout
