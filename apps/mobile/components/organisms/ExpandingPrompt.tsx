import React, { useState, useRef, useEffect } from 'react'
import { TextInput, View, TouchableWithoutFeedback, Animated, StyleSheet, Dimensions, Keyboard, Platform } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPaperTheme } from '@/hooks/useThemeColor'

const styles = StyleSheet.create({
  animatedContainer: {
    borderRadius: 30, // Make the container completely rounded like a pill
    borderWidth: 1
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'top'
  },
  inputContainer: {
    justifyContent: 'flex-start',
    padding: 10
  },
  placeholderText: {
    left: 15,
    position: 'absolute',
    top: 20
  }
})

const ExpandingPillInput = () => {
  const [ expanded, setExpanded ] = useState(false)
  const inputRef = useRef<TextInput | null>(null)
  const paperTheme = getPaperTheme()
  const colors = paperTheme.colors
  const screenWidth = Dimensions.get('window').width

  // Animation value
  const animation = useRef(new Animated.Value(0)).current

  // Expand animation
  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 150, // Faster and snappier transition
      useNativeDriver: false
    }).start(() => {
      if (expanded) {
        inputRef.current?.focus()
      }
    })
  }, [ expanded ])

  // Calculate the height based on animation value
  const inputHeight = animation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 60, 120 ] // Increased collapsed height
  })

  // Placeholder translation and opacity based on animation value
  const placeholderTranslateY = animation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, -10 ]
  })

  const placeholderOpacity = animation.interpolate({
    inputRange: [ 0, 0.1 ],
    outputRange: [ 1, 0 ],
    extrapolate: 'clamp'
  })

  const handleOutsideTap = () => {
    if (expanded) {
      inputRef.current?.blur()
      setExpanded(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsideTap}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setExpanded(true)}>
          <Animated.View
            style={[
              styles.inputContainer,
              styles.animatedContainer,
              {
                backgroundColor: colors.primaryContainer,
                height: inputHeight,
                width: screenWidth - 32, // Full width with some padding from the sides
                borderColor: expanded ? colors.primary : colors.secondary // Use primary color for active/focused border and secondary for inactive border
              }
            ]}
          >
            <Animated.Text
              style={[
                styles.placeholderText,
                {
                  transform: [ { translateY: placeholderTranslateY } ],
                  color: colors.onPrimaryContainer, // Placeholder color
                  opacity: placeholderOpacity
                }
              ]}
            >
              Enter your text...
            </Animated.Text>
            <TextInput
              ref={(ref) => { inputRef.current = ref }}
              multiline={expanded}
              placeholder=""
              placeholderTextColor={colors.onPrimaryContainer}
              selectionColor={colors.primary} // Explicitly set the caret color (selectionColor controls the caret on iOS)
              style={[
                styles.input,
                {
                  color: colors.onPrimaryContainer,
                  height: '100%',
                  ...Platform.select({
                    android: {
                      caretColor: colors.primary // Explicitly set caret color for Android
                    }
                  })
                }
              ]}
              onFocus={() => setExpanded(true)}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ExpandingPillInput
