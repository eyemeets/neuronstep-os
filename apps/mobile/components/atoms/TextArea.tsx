import React from 'react'
import type { TextInputProps } from 'react-native-paper'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { getPaperTheme } from '@/hooks/useThemeColor'
import HelperText from './HelperText'

interface CustomTextAreaProps extends TextInputProps {
  className?: string
  style?: object
  errorMessage?: string // Error message prop for validation feedback
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  className,
  style,
  errorMessage,
  ...rest
}) => {
  const paperTheme = getPaperTheme()
  const colors = paperTheme.colors

  // Custom theme for the text input
  const theme = {
    ...paperTheme,
    colors: {
      background: colors.primaryContainer, // Background color of input
      text: colors.onPrimaryContainer, // Text color
      placeholder: colors.onPrimaryContainer, // Placeholder color
      primary: colors.primary, // Active/focused border color
      outline: colors.secondary // Inactive border color
    }
  }

  // Custom outline style for the TextInput
  const outlineStyle = {
    borderRadius: 10 // Custom border radius
  }

  return (
    <>
      <PaperTextInput
        style={style} // Apply passed styles
        outlineStyle={outlineStyle} // Outline-specific styles for the border
        mode="outlined" // Outlined mode for the text input
        theme={theme} // Apply the custom theme
        error={!!errorMessage} // Display error state based on errorMessage
        multiline // Enable multiline for text area behavior
        numberOfLines={4} // Initial number of visible lines
        {...rest} // Ensure all other props (like onChangeText, value) are passed correctly
      />
      {errorMessage ? (
        <HelperText value={errorMessage} type="error" visible={!!errorMessage} />
      ) : null}
    </>
  )
}

export default CustomTextArea
