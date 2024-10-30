import { StyleSheet } from 'react-native'
import { getPaperTheme } from '@/hooks/useThemeColor'

export function styleSheet() {
  const theme = getPaperTheme()

  return StyleSheet.create({
    avatarStyle: {
      marginLeft: 8
    },
    dialogButton: {
      marginRight: 10
    },
    drawerContainer: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 350,
      zIndex: 1000
    },
    drawerSection: {
      borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 999 // Ensure overlay covers the entire screen
    },
    profileContainer: {
      alignItems: 'center',
      borderBottomColor: theme.colors.elevation.level1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      paddingBottom: 16,
      paddingHorizontal: 16, paddingTop: 16
    },
    profileText: {
      color: theme.colors.onBackground,
      fontWeight: '500'
    },
    profileTextContainer: {
      marginLeft: 16
    },
    userNameText: {
      fontWeight: '600'
    }
  })
}
