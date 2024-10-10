import React from 'react'
import { Appbar, Avatar, IconButton } from 'react-native-paper'
import type { ViewStyle } from 'react-native'
import { StatusBar, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/stores/auth' // Import the auth store for user authentication
import { useUiStore } from '@/stores/user-ui' // Import the UI store for drawer management
import { getPaperTheme } from '@/hooks/useThemeColor'

interface HeaderProps {
  title?: string
  onMenuPress?: () => void
  onProfilePress?: () => void
  onDarkModeToggle?: () => void
  style?: ViewStyle
}

const Header: React.FC<HeaderProps> = ({
  title,
  onMenuPress,
  onProfilePress,
  onDarkModeToggle,
  style
}) => {
  const theme = getPaperTheme()
  const user = useAuthStore((state) => state.user)
  const toggleDrawer = useUiStore((state) => state.toggleDrawer) // Access the drawer toggle function from the UI store
  const userInitial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : '?' // Default to '?' if no user name is available

  const handleProfilePress = () => {
    toggleDrawer() // Use the UI store to toggle the drawer state
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.headerBackground }} edges={[ 'top' ]}>
      <StatusBar
        backgroundColor={theme.colors.headerBackground}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        translucent={false}
      />
      <Appbar.Header
        dark={false}
        elevated={false}
        theme={{ colors: { primary: theme.colors.headerBackground } }}
        style={[
          {
            backgroundColor: theme.colors.headerBackground,
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0
          },
          style
        ]}
      >
        <TouchableOpacity onPress={handleProfilePress}>
          <Avatar.Text
            size={36}
            label={userInitial}
            style={{ backgroundColor: theme.colors.background, marginLeft: 8 }}
            color={theme.colors.accent}
          />
        </TouchableOpacity>
        <Appbar.Content title={title || 'NeuronStep'} titleStyle={{ color: theme.colors.headerTitle }} />
        <IconButton
          icon={theme.dark ? 'weather-sunny' : 'moon-waxing-crescent'}
          size={24}
          onPress={onDarkModeToggle}
          style={{ marginRight: 8, backgroundColor: theme.colors.background }}
          iconColor={theme.colors.defaultIcon}
        />
      </Appbar.Header>
    </SafeAreaView>
  )
}

export default Header
