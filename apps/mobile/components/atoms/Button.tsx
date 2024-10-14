import React from 'react'
import type { ButtonProps } from 'react-native-paper'
import { Button as PaperButton, ActivityIndicator } from 'react-native-paper'
import { styled } from 'nativewind'
import { getPaperTheme } from '@/hooks/useThemeColor'
import Text from './Text'

// Create a styled version of Paper's Button component
const StyledButton = styled(PaperButton)

// Define a custom component that supports all PaperButton props, optional text, className, and loading state
interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  className?: string
  text?: string
  children?: React.ReactNode
  loading?: boolean // Add loading prop
  loadIconSize?: number // Add loadIconSize prop for ActivityIndicator size
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  style,
  text,
  children,
  loading = false, // Default loading to false
  loadIconSize = 20, // Default loadIconSize to 20
  ...rest
}) => {
  const theme = getPaperTheme()
  const colors = theme.colors

  // Safeguard the button theme values to prevent undefined or malformed colors
  const buttonTheme = {
    colors: {
      primary: colors.primary || '#6200ee', // Fallback to a valid default color
      text: colors.onPrimary || '#ffffff', // Ensure text color is valid
      surface: colors.primaryContainer || '#bb86fc' // Fallback to a valid container color
    }
  }

  const customStyle = [
    { paddingVertical: 8, paddingHorizontal: 0 }, // Adjust padding for more space
    style // Merge additional styles passed in
  ]

  return (
    <StyledButton
      className={className}
      style={customStyle}
      theme={buttonTheme} // Ensure valid theming is passed
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size={loadIconSize} // Use loadIconSize prop
          style={{ marginRight: 8 }} // Optional: adjust the margin if needed
        />
      ) : text ? (
        <Text value={text} />
      ) : (
        children
      )}
    </StyledButton>
  )
}

export default CustomButton
