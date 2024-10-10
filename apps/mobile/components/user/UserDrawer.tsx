import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated, PanResponder, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import { Drawer, Avatar, Text, Dialog } from 'react-native-paper'
import { useUiStore } from '@/stores/user-ui'
import { useAuthStore } from '@/stores/auth'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import type { AuthStackParamList } from '@/types/auth'

const styles = StyleSheet.create({
  drawerContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 350,
    zIndex: 1000
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999 // Ensure overlay covers the entire screen
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  profileTextContainer: {
    marginLeft: 16
  }
})

const CustomDrawer: React.FC = () => {
  const theme = getPaperTheme()
  const isDrawerOpen = useUiStore((state) => state.isDrawerOpen)
  const closeDrawer = useUiStore((state) => state.closeDrawer)
  const slideAnim = React.useRef(new Animated.Value(-350)).current
  const overlayAnim = React.useRef(new Animated.Value(0)).current
  const [ isVisible, setIsVisible ] = useState(isDrawerOpen)
  const [ dialogVisible, setDialogVisible ] = useState(false) // Dialog visibility state
  const [ error, setError ] = useState<string | null>(null) // Error state
  const user = useAuthStore((state) => state.user)
  const signOutUser = useAuthStore((state) => state.signOutUser)

  const userInitial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : '?' // Default to '?' if no user name is available
  const userName = user?.displayName || 'Guest'

  useEffect(() => {
    if (isDrawerOpen) {
      setIsVisible(true)
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(overlayAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true
        })
      ]).start()
    }
    else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -350,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => setIsVisible(false))
    }
  }, [ isDrawerOpen ])

  const handleSignOut = async () => {
    closeDrawer()
    setIsVisible(false)
    closeDrawer()
    try {
      await signOutUser()
      const navigation = useTypedNavigation<AuthStackParamList>()

      navigation.navigate('auth', { screen: 'login' })
    }
    catch (error) {
      setError('Something went wrong. Please try again or contact support.')
      setDialogVisible(true)
    }
  }

  const hideDialog = () => {
    setDialogVisible(false)
    setError(null)
  }

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => gestureState.dx > 10 || gestureState.dx < -10,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx > 10 || gestureState.dx < -10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          slideAnim.setValue(Math.max(gestureState.dx, -350))
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.timing(slideAnim, {
            toValue: -350,
            duration: 150,
            useNativeDriver: true
          }).start(() => closeDrawer())
        }
        else {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start()
        }
      }
    })
  ).current

  return (
    <>
      {isVisible && (
        <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 999 }} pointerEvents="box-none">
          <TouchableWithoutFeedback
            onPress={closeDrawer}
          >
            <Animated.View
              style={[
                styles.overlay,
                {
                  backgroundColor: overlayAnim.interpolate({ inputRange: [ 0, 0.5 ], outputRange: [ 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)' ] })
                }
              ]}
            />
          </TouchableWithoutFeedback>

          {/* Drawer */}
          <Animated.View
            style={[
              styles.drawerContainer,
              { backgroundColor: theme.colors.drawerBackground, transform: [ { translateX: slideAnim } ] }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Drawer content */}
            <SafeAreaView>
              <View style={styles.profileContainer}>
                <Avatar.Text
                  size={48}
                  label={userInitial}
                  style={{ backgroundColor: theme.colors.background, marginLeft: 8 }}
                  color={theme.colors.accent}
                />
                <View style={styles.profileTextContainer}>
                  <Text variant="titleLarge" style={{ color: theme.colors.onBackground, fontWeight: '600' }}>{userName}</Text>
                  <Text variant="bodyLarge" style={{ color: 'gray', fontWeight: '500' }}>View profile</Text>
                </View>
              </View>
            </SafeAreaView>
            <Drawer.Section>
              <Drawer.Item label="Settings and privacy" icon="cog" onPress={() => {}} labelStyle={{ fontWeight: '700' }} />

              <Drawer.Item
                label="Log out"
                icon="logout"
                onPress={handleSignOut}
                labelStyle={{ fontWeight: '700' }}
              />
            </Drawer.Section>
          </Animated.View>
        </View>
      )}

      <Dialog
        visible={dialogVisible}
        onDismiss={hideDialog}
        title="Sign Out Error"
        contentText={error || ''}
        confirmText="OK"
        onConfirm={hideDialog}
      />
    </>
  )
}

export default CustomDrawer
