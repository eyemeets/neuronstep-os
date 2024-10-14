import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { ActivityIndicator, Card, List, IconButton } from 'react-native-paper'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { useUiStore } from '@/stores/user-ui'
import { useRoute } from '@react-navigation/native'
import { getPaperTheme } from '@/hooks/useThemeColor'

import type { RouteProp } from '@react-navigation/native'
import type { UserObjectiveParamsSchema, CourseGenStructure } from '@repo/shared-types'
import { createCourseObjective } from '@/services/course/create-objective'
import { createCoursePlan } from '@/services/course/create-plan'
import { createCourseOutline } from '@/services/course/create-outline'
import { createCourseContent } from '@/services/course/create-content'

const BuildPage = () => {
  const uiStore = useUiStore()
  const navigation = useTypedNavigation()
  const route = useRoute<RouteProp<{ form: UserObjectiveParamsSchema }, 'form'>>()
  const theme = getPaperTheme()
  const form = route.params

  const [ status, setStatus ] = useState({
    objective: 'Not Started',
    plan: 'Not Started',
    outline: 'Not Started',
    content: 'Not Started'
  })

  useEffect(() => {
    (async () => {
      try {
        // Create the objective
        setStatus((prev) => ({ ...prev, objective: 'In Progress' }))
        const objective = await createCourseObjective({ data: JSON.stringify(form) })

        if (!objective) throw new Error('Objective is undefined')
        useCurriculumStore.getState().setObjective(objective)
        setStatus((prev) => ({ ...prev, objective: 'Completed' }))

        if (!objective?.valid) {
          uiStore.toggleObjectiveInvalidPanel()
          return
        }

        // Create the plan
        setStatus((prev) => ({ ...prev, plan: 'In Progress' }))
        const plan = await createCoursePlan(objective)

        if (!plan) return
        useCurriculumStore.getState().setPlan(plan)
        setStatus((prev) => ({ ...prev, plan: 'Completed' }))

        // Create the outline
        setStatus((prev) => ({ ...prev, outline: 'In Progress' }))
        const outline = await createCourseOutline({ objective, plan })

        if (!outline) return
        useCurriculumStore.getState().setOutline(outline)
        setStatus((prev) => ({ ...prev, outline: 'Completed' }))

        // Create the content
        setStatus((prev) => ({ ...prev, content: 'In Progress' }))
        const data: CourseGenStructure = { objective, plan, outline }
        const content = await createCourseContent(data)

        if (!content) return
        useCurriculumStore.getState().setOutline(content)
        setStatus((prev) => ({ ...prev, content: 'Completed' }))

        // Navigate to the course overview
        navigation.navigate('course', {
          screen: 'overview',
          plan
        })
      }
      catch (error) {
        console.error('Error creating course:', error)
      }
    })()
  }, [ form, navigation, uiStore ])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.background }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Build the Course" titleStyle={{ color: theme.colors.primary }} />
        <Card.Content>
          <List.Section>
            <List.Item
              title="Create Objective"
              left={() =>
                status.objective === 'In Progress' ? (
                  <ActivityIndicator animating color={theme.colors.primary} />
                ) : status.objective === 'Completed' ? (
                  <IconButton icon="check-circle" iconColor={theme.colors.primary} />
                ) : (
                  <IconButton icon="circle-outline" iconColor={theme.colors.onSurfaceVariant} />
                )
              }
            />
            <List.Item
              title="Create Plan"
              left={() =>
                status.plan === 'In Progress' ? (
                  <ActivityIndicator animating color={theme.colors.primary} />
                ) : status.plan === 'Completed' ? (
                  <IconButton icon="check-circle" iconColor={theme.colors.primary} />
                ) : (
                  <IconButton icon="circle-outline" iconColor={theme.colors.onSurfaceVariant} />
                )
              }
            />
            <List.Item
              title="Create Outline"
              left={() =>
                status.outline === 'In Progress' ? (
                  <ActivityIndicator animating color={theme.colors.primary} />
                ) : status.outline === 'Completed' ? (
                  <IconButton icon="check-circle" iconColor={theme.colors.primary} />
                ) : (
                  <IconButton icon="circle-outline" iconColor={theme.colors.onSurfaceVariant} />
                )
              }
            />
            <List.Item
              title="Create Content"
              left={() =>
                status.content === 'In Progress' ? (
                  <ActivityIndicator animating color={theme.colors.primary} />
                ) : status.content === 'Completed' ? (
                  <IconButton icon="check-circle" iconColor={theme.colors.primary} />
                ) : (
                  <IconButton icon="circle-outline" iconColor={theme.colors.onSurfaceVariant} />
                )
              }
            />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

export default BuildPage
