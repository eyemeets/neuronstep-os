import { StyleSheet } from 'react-native'
import { getPaperTheme } from '@/hooks/useThemeColor'

export const useStyles = () => {
  const theme = getPaperTheme()

  return StyleSheet.create({
    header: {
      backgroundColor: theme.colors.headerBackground,
      elevation: 0,
      shadowColor: theme.colors.elevation.level0,
      borderBottomWidth: 0,
      height: 75,
      paddingHorizontal: 20
    },
    avatar: {
      backgroundColor: theme.colors.background,
      marginLeft: 0
    },
    avatarLabel: {
      fontWeight: 600
    },
    title: {
      color: theme.colors.headerTitle
    },
    iconButtonContainer: {
      marginRight: 0
    },
    iconView: {
      backgroundColor: theme.colors.background,
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18
    },
    iconButton: {
      margin: 0
    }
  })
}
