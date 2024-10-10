import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import type { TextInput as RNTextInput } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import type { TextInputProps } from 'react-native-paper'
import { getPaperTheme } from '@/hooks/useThemeColor'
import HelperText from './HelperText'

import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Adjust as needed to ensure there is enough space for the error message
    position: 'relative'
  },
  helperText: {
    bottom: -30,
    left: 0,
    position: 'absolute' // Position the error message below the text input
  },
  textInput: {
    // You can add styles here if needed
  }
})


interface CustomTextInputProps extends TextInputProps {
  className?: string
  style?: object
  errorMessage?: string
  customOutlineStyle?: object // Custom outline styles, such as borderRadius
}

const CustomTextInput = forwardRef<RNTextInput, CustomTextInputProps>(
  ({ className, style, errorMessage, customOutlineStyle, ...rest }, ref) => {
    const innerRef = useRef<RNTextInput>(null)
    const paperTheme = getPaperTheme()
    const colors = paperTheme.colors

    useImperativeHandle(ref, () => {
      if (innerRef.current) {
        return innerRef.current
      }
      else {
        throw new Error('TextInput reference is not available')
      }
    })

    // Custom theme for the text input
    const theme = {
      ...paperTheme,
      colors: {
        background: colors.primaryContainer,
        text: colors.onPrimaryContainer,
        placeholder: colors.onPrimaryContainer,
        primary: colors.primary,
        outline: 'transparent' // Set outline to transparent to remove blue border
      }
    }

    // Merge default outline styles with custom outline styles
    const outlineStyle = {
      borderRadius: 10,
      ...customOutlineStyle // Allow custom styles to overwrite
    }

    return (
      <>
        <PaperTextInput
          ref={innerRef}
          style={style}
          outlineStyle={outlineStyle}
          mode="outlined"
          theme={theme}
          error={!!errorMessage}
          {...rest}
        />
        {errorMessage ? (
          <View style={styles.helperText}>
            <HelperText value={errorMessage} type="error" visible={!!errorMessage} />
          </View>
        ) : null}
      </>
    )
  }
)

// Adding display name to avoid ESLint warning
CustomTextInput.displayName = 'CustomTextInput'

export default CustomTextInput
