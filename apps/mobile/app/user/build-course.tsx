import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { ActivityIndicator, Card, List, IconButton } from 'react-native-paper'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { useUiStore } from '@/stores/user-ui'
import { useRoute } from '@react-navigation/native'
import { getPaperTheme } from '@/hooks/useThemeColor'
import View from '@/components/atoms/View'
import type { RouteProp } from '@react-navigation/native'
import type { UserObjectiveParamsSchema, CourseGenStructure, CourseObjectiveSchema, CoursePlanSchema, CourseOutlineSchema } from '@repo/shared-types'
import { createCourseObjective, createCoursePlan, createCourseOutline, createCourseContent } from '@repo/shared-http'
import { auth } from '@/fb.config'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16
  },
  card: {
    marginBottom: 16,
    borderRadius: 12
  },
  iconStyle: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }
})

interface StatusListItemProps {
  title: string
  status: string
  theme: ReturnType<typeof getPaperTheme>
}

const StatusListItem: React.FC<StatusListItemProps> = ({ title, status, theme }) => (
  <List.Item
    title={title}
    left={() =>
      status === 'In Progress' ? (
        <ActivityIndicator size={24} animating color={theme.colors.primary} style={styles.iconStyle} />
      ) : status === 'Completed' ? (
        <IconButton size={24} icon="check-circle" iconColor={theme.colors.primary} style={styles.iconStyle} />
      ) : (
        <IconButton size={24} icon="circle-outline" iconColor={theme.colors.onSurfaceVariant} style={styles.iconStyle} />
      )
    }
  />
)

const BuildPage: React.FC = () => {
  const uiStore = useUiStore()
  const navigation = useTypedNavigation()
  const route = useRoute<RouteProp<{ params: { form: UserObjectiveParamsSchema } }, 'params'>>()
  const theme = getPaperTheme()

  console.log('route.params.form', route.params.form)
  const form = route.params.form

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
        const objective: CourseObjectiveSchema | null = await createCourseObjective({
          data: JSON.stringify(form),
          auth
        })

        if (!objective) throw new Error('Objective is undefined')
        useCurriculumStore.getState().setObjective(objective)
        setStatus((prev) => ({ ...prev, objective: 'Completed' }))

        if (!objective?.valid) {
          uiStore.toggleObjectiveInvalidPanel()
          return
        }

        // Create the plan
        setStatus((prev) => ({ ...prev, plan: 'In Progress' }))
        const plan: CoursePlanSchema | null = await createCoursePlan({ auth, objective })

        if (!plan) throw new Error('Plan is undefined')
        useCurriculumStore.getState().setPlan(plan)
        setStatus((prev) => ({ ...prev, plan: 'Completed' }))

        if (!plan.assistant_id || !plan.thread_id) {
          navigation.navigate('user', { screen: 'objective' })
          return
        }
        // Create the outline
        setStatus((prev) => ({ ...prev, outline: 'In Progress' }))
        const outline: CourseOutlineSchema | null = await createCourseOutline({ auth, objective, plan })

        if (!outline) throw new Error('Outline is undefined')
        useCurriculumStore.getState().setOutline(outline)
        setStatus((prev) => ({ ...prev, outline: 'Completed' }))

        // Create the content
        setStatus((prev) => ({ ...prev, content: 'In Progress' }))
        const coursePlan: CourseGenStructure = { objective, plan, outline }

        if (!coursePlan.objective.valid || !coursePlan.plan.thread_id || !coursePlan.outline.id) {
          alert('Invalid data. Please try again.')
          console.log(
            'Objective valid:',
            coursePlan.objective.valid,
            'Thread ID:',
            coursePlan.plan.thread_id,
            'Outline ID:',
            coursePlan.outline.id
          )
          return
        }
        const content: CourseOutlineSchema | null = await createCourseContent({ auth, coursePlan })

        if (!content) throw new Error('Content is undefined')
        useCurriculumStore.getState().setOutline(content)
        setStatus((prev) => ({ ...prev, content: 'Completed' }))

        // Navigate to the course overview
        navigation.navigate('COURSE', {
          screen: 'overview',
          params: { outline }
        })
      }
      catch (error) {
        console.error('Error creating course:', error)
      }
    })()
  }, [ form, navigation, uiStore ])

  return (
    <View style={[ styles.container, { backgroundColor: theme.colors.background } ]}>
      <Card style={styles.card}>
        <Card.Title title="Building the Course" titleStyle={{ color: theme.colors.primary }} />
        <Card.Content>
          <List.Section>
            <StatusListItem title="Create Objective" status={status.objective} theme={theme} />
            <StatusListItem title="Create Plan" status={status.plan} theme={theme} />
            <StatusListItem title="Create Outline" status={status.outline} theme={theme} />
            <StatusListItem title="Create Content" status={status.content} theme={theme} />
          </List.Section>
        </Card.Content>
      </Card>
    </View>
  )
}

export default BuildPage
