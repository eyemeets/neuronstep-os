import { StyleSheet } from 'react-native'
import { getPaperTheme } from '@/hooks/useThemeColor'

export const initStyle = () => {
  const theme = getPaperTheme()

  return StyleSheet.create({
    activityIndicator: {
      bottom: 20,
      position: 'absolute',
      right: 20,
      zIndex: 1
    },
    collapsibleContainer: {
      marginBottom: 200,
      marginTop: 25
    },
    container: {
      flex: 1
    },
    explanation: {
      paddingBottom: 25
    },
    inputGroup: {
      marginBottom: 15
    },
    searchIcon: {
      backgroundColor: theme.colors.elevation.level0,
      left: 5,
      position: 'absolute',
      top: 5,
      zIndex: 1
    },
    settingsButton: {
      bottom: 5,
      left: 5,
      position: 'absolute',
      zIndex: 1
    },
    submitButton: {
      bottom: 5,
      position: 'absolute',
      right: 5,
      zIndex: 1
    },
    textArea: {
      borderColor: theme.colors.elevation.level0,
      borderWidth: 1,
      minHeight: 150,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 2.5,
      textAlignVertical: 'top',
      width: '100%',
      zIndex: -1
    },
    outlineStyle: {
      borderRadius: 20
    },
    textAreaContainer: {
      position: 'relative'
    }
  })
}
