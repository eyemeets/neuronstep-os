import React from 'react'
import type { ButtonProps } from 'react-native-paper'
import { Button as PaperButton } from 'react-native-paper'
import { styled } from 'nativewind'
import { getPaperTheme } from '@/hooks/useThemeColor'
import Text from './Text'
// Create a styled version of Paper's Button component
const StyledButton = styled(PaperButton)

// Define a custom component that supports all PaperButton props, optional text, and className
interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  className?: string
  text?: string
  children?: React.ReactNode
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, style, text, children, ...rest }) => {
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
      {text ?
          (<Text value={text} />)
        : children}
    </StyledButton>
  )
}

export default CustomButton
