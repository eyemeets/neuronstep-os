import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useCurriculumStore } from '@/stores/curriculum'

const ChaptersPage = () => {
  // Access the outline from the curriculum store
  const { outline } = useCurriculumStore()

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
    noDataText: {
      color: 'gray',
      fontSize: 16
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 12
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8
    },
    subtopicTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.chapterTitle}>Chapters</Text>
      
      {outline ? (
        outline.chapters.map((chapter, chapterIndex) => (
          <View key={chapterIndex}>
            {/* Chapter Topic */}
            <Text style={styles.sectionTitle}>{chapter.topic}</Text>

            {/* Subtopics and Pages */}
            {chapter.subtopics.map((subtopic, subtopicIndex) => (
              <View key={subtopicIndex}>
                <Text style={styles.subtopicTitle}>{subtopic.subtopic}</Text>

                {/* Iterate through all pages within the subtopic */}
                {subtopic.pages && subtopic.pages.map((page, pageIndex) => (
                  <Text key={pageIndex} style={styles.paragraph}>
                    {page.content}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No chapters available</Text>
      )}
    </ScrollView>
  )
}

export default ChaptersPage
