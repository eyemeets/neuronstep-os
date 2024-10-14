import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useCurriculumStore } from '@/stores/curriculum'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { useUiStore } from '@/stores/user-ui'
import SlideUpPanel from '@/components/molecules/SlideUpPanel'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { getPaperTheme } from '@/hooks/useThemeColor'

const CurriculumObjectiveInvalidPanel: React.FC = () => {
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
    noDataText: {
      color: theme.colors.onPrimary
    }
  })

  const { objective } = useCurriculumStore()
  const uiStore = useUiStore()
  const [ loading, setLoading ] = useState(false)

  function handleConfirm() {
    uiStore.closeObjectiveInvalidPanel()
  }

  return (
    <SlideUpPanel panelTitle="Overview" isVisible={uiStore.isObjectiveInvalidPanelVisible} onClose={uiStore.closeObjectiveInvalidPanel}>
      {objective ? (
        <View>
          {objective.standard_classification?.description && (
            <Text
              value={objective.standard_classification.description}
              style={styles.classificationText}
            />
          )}

          <Text value={objective.content_description} variant="bodyLarge" style={styles.feedbackText} />

          {!objective.valid && objective.friendly_feedback && (
            <Text value={objective.friendly_feedback} variant="bodyLarge" style={styles.feedbackText} />
          )}

          <Button
            text="Ok"
            mode="contained"
            onPress={handleConfirm}
            loading={loading} // Pass loading state to button
            disabled={loading} // Disable the button when loading
            style={styles.button}
          />
        </View>
      ) : (
        <Text value="No validation data available." variant="bodyLarge" style={styles.noDataText} />
      )}
    </SlideUpPanel>
  )
}

export default CurriculumObjectiveInvalidPanel
