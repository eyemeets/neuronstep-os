import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { useUiStore } from '@/stores/user-ui'
import SlideUpPanel from '@/components/molecules/SlideUpPanel'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import Icon from 'react-native-vector-icons/MaterialIcons' // Assuming you're using Material Icons
import { getPaperTheme } from '@/hooks/useThemeColor'
import { analyzeCourse } from '@/services/useAnalyzeCourse'
import { auth } from '@/fb.config'
import { useFirestore } from '@/hooks/useFirestore'

const CurriculumValidationPanel: React.FC = () => {
  const theme = getPaperTheme()

  const styles = StyleSheet.create({
    button: {
      marginTop: 16
    },
    classificationText: {
      color: theme.colors.onPrimary,
      fontSize: 20,
      marginBottom: 16
    },
    feedbackText: {
      color: theme.colors.onPrimary,
      marginBottom: 8
    },
    flexRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12
    },
    icon: {
      marginRight: 4
    },
    iconTextRow: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    noDataText: {
      color: theme.colors.onPrimary
    }
  })

  const { objective } = useCurriculumStore()
  const navigation = useTypedNavigation()
  const { isValidationPanelVisible, closeValidationPanel } = useUiStore()
  const { addDoc } = useFirestore()

  const handleConfirm = async () => {
    if (!objective) {
      throw new Error(`Objective is ${typeof objective}`)
    }
    useCurriculumStore.getState().setObjective(objective)

    // Send the validation object for analysis and content creation
    const response = await analyzeCourse(objective)

    if (!response) {
      throw new Error('Plan and outline was null or undefined.')
    }

    const uid = auth.currentUser?.uid

    const plan = {
      uid,
      createdAt: new Date(),
      ...response.plan
    }

    const outline = {
      uid,
      createdAt: new Date(),
      ...response.outline
    }

    // Populate store data
    useCurriculumStore.getState().setPlan(plan)
    useCurriculumStore.getState().setOutline(outline)

    // Write data to db
    Promise.all([
      addDoc('course-plans', plan),
      addDoc('course-outlines', outline)
    ])    

    // Navigate to chapters and wait for content generation
    navigation.navigate('chapters')
  }

  return (
    <SlideUpPanel panelTitle="Overview" isVisible={isValidationPanelVisible} onClose={closeValidationPanel}>
      {objective ? (
        <View>
          {/* Classification */}
          {objective.standard_classification?.description && (
            <Text
              value={objective.standard_classification.description}
              style={styles.classificationText}
            />
          )}

          {/* Content Description */}
          <Text
            value={objective.content_description}
            variant="bodyLarge"
            style={styles.feedbackText}
          />

          {/* Feedback if not valid */}
          {!objective.valid && objective.friendly_feedback && (
            <Text
              value={objective.friendly_feedback}
              variant="bodyLarge"
              style={styles.feedbackText}
            />
          )}

          {/* Flex Row with Time and Language */}
          <View style={styles.flexRow}>
            <View style={styles.iconTextRow}>
              <Icon name="schedule" size={20} color={theme.colors.onPrimary} style={styles.icon} />
              <Text value={`${objective.estimated_timeframe} hours`} variant="bodyLarge" />
            </View>
            <View style={styles.iconTextRow}>
              <Icon name="language" size={20} color={theme.colors.onPrimary} style={styles.icon} />
              <Text value={objective.languageName} variant="bodyLarge" />
            </View>
          </View>

          <Button text="Create course" mode="contained" onPress={handleConfirm} style={styles.button} />
        </View>
      ) : (
        <Text value="No validation data available." variant="bodyLarge" style={styles.noDataText} />
      )}
    </SlideUpPanel>
  )
}

export default CurriculumValidationPanel
