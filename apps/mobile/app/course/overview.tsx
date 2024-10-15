import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import type { RouteProp } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import type { CourseObjectiveSchema, CourseOutlineSchema, CoursePlanSchema } from '@repo/shared-types'


const CourseOverview = () => {
  // const { outline } = useCurriculumStore() // Access the curriculum store
  const navigation = useTypedNavigation()
  // Use the useRoute hook to access the typed route params
  const route = useRoute<RouteProp<{ params: { outline: CourseOutlineSchema } }, 'params'>>()
  const outline = route.params.outline // Destructure the passed data

  // Create styles for the page
  const styles = StyleSheet.create({
    chapterTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16
    },
    container: {
      padding: 16
    },
    courseTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 16
    },
    noDataText: {
      color: 'gray',
      fontSize: 16
    }
  })

  const goToChapter = (chapterId: string) => {
    // Navigate to chapter details with course_id or chapter_id as param
    navigation.navigate('overview', {
      screen: 'course', 
      course: {
        id: '',
        chapterId: '',
        subTopicId: '',
        pageId: ''
      }
    })

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display Course Title */}
      <Text style={styles.courseTitle}>{outline?.title || 'Course Overview'}</Text>

      {outline ? (
        outline.chapters.map((chapter, chapterIndex) => (
          <View key={chapterIndex}>
            {/* Chapter Topic */}
            <Text style={styles.chapterTitle}>{chapter.topic}</Text>
            
            {/* Add Button or Touchable to navigate to chapter details */}
            <Button
              title={`Go to ${chapter.topic}`}
              onPress={() => goToChapter(chapter.id)} // Pass the chapter id as param
            />
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No chapters available</Text>
      )}
    </ScrollView>
  )
}

export default CourseOverview
