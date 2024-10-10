import React, { useRef, useEffect } from 'react'
import { Animated, StyleSheet, PanResponder, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native'
import { IconButton, Divider } from 'react-native-paper'
import { getPaperTheme } from '@/hooks/useThemeColor'
import Text from '../atoms/Text'

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999 // Moved from inline style
  },
  handleBar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 5,
    marginBottom: 16,
    width: 50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999 // Ensure overlay covers the entire screen
  },
  panelContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    height: 500,
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
    zIndex: 1000 // Moved to StyleSheet

  },
  panelContent: {
    marginTop: 20
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

interface CustomSlideUpPanelProps {
  panelTitle: string
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}

const CustomSlideUpPanel: React.FC<CustomSlideUpPanelProps> = ({ panelTitle, isVisible, onClose, children }) => {
  const theme = getPaperTheme()
  const slideAnim = useRef(new Animated.Value(500)).current
  const overlayAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
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
          toValue: 500,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start()
    }
  }, [ isVisible ])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(slideAnim, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true
          }).start(() => onClose())
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
        <View style={styles.absoluteFill} pointerEvents="box-none">
          <TouchableWithoutFeedback onPress={onClose}>
            <Animated.View
              style={[
                styles.overlay,
                {
                  backgroundColor: overlayAnim.interpolate({
                    inputRange: [ 0, 0.5 ],
                    outputRange: [ 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)' ]
                  })
                }
              ]}
            />
          </TouchableWithoutFeedback>

          {/* Slide-up panel */}
          <Animated.View
            style={[
              styles.panelContainer,
              { backgroundColor: theme.colors.primaryContainer, transform: [ { translateY: slideAnim } ] }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Handle Bar */}
            <View style={[ styles.handleBar, { backgroundColor: theme.colors.onSurfaceVariant } ]} />

            {/* Panel Header */}
            <View style={styles.panelHeader}>
              <Text textType="h3" value={panelTitle} style={{ color: theme.colors.onPrimary }} />
              <IconButton icon="close" size={20} onPress={onClose} iconColor={theme.colors.onPrimary} />
            </View>

            <Divider style={{ backgroundColor: theme.colors.onPrimary }} />

            {/* Panel Content */}
            <View style={styles.panelContent}>{children}</View>
          </Animated.View>
        </View>
      )}
    </>
  )
}

export default CustomSlideUpPanel
