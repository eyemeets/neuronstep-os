import React from 'react'
import { Appbar, Avatar, IconButton } from 'react-native-paper'
import type { ViewStyle } from 'react-native'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/user-ui'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { useStyles } from './styles'

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
  const styles = useStyles()
  const user = useAuthStore((state) => state.user)
  const toggleDrawer = useUiStore((state) => state.toggleDrawer)
  const userInitial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : '?'

  return (
    <Appbar.Header style={[ styles.header, style ]}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Avatar.Text
          size={36}
          label={userInitial}
          style={styles.avatar}
          color={theme.colors.accent}
          labelStyle={styles.avatarLabel}
        />
      </TouchableOpacity>
      <Appbar.Content title={title || 'NeuronStep'} titleStyle={styles.title} />
      <TouchableOpacity onPress={onDarkModeToggle} style={styles.iconButtonContainer}>
        <View style={styles.iconView}>
          <IconButton
            icon={theme.dark ? 'weather-sunny' : 'moon-waxing-crescent'}
            size={20}
            iconColor={theme.colors.accent}
            style={styles.iconButton}
          />
        </View>
      </TouchableOpacity>
    </Appbar.Header>
  )
}

export default Header
