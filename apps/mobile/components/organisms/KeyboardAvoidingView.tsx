import React from 'react'
import type { KeyboardAvoidingViewProps } from 'react-native'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { styled } from 'nativewind'

// Styled version of KeyboardAvoidingView
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)

// Define custom props, including className and standard KeyboardAvoidingViewProps
interface CustomKeyboardAvoidingViewProps extends KeyboardAvoidingViewProps {
  className?: string
  children?: React.ReactNode
}

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    // Apply the styled component and pass down className and other props
    <StyledKeyboardAvoidingView
      className={className}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...rest}
    >
      {children}
    </StyledKeyboardAvoidingView>
  )
}

export default CustomKeyboardAvoidingView
