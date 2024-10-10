// src/components/atoms/View.tsx
import React from 'react'
import type { ViewProps } from 'react-native'
import { View as NativeView } from 'react-native'
import { styled } from 'nativewind'

// Create a styled version of React Native's View component
const StyledView = styled(NativeView)

// Define a custom component that supports all native View props and the className prop
const CustomView: React.FC<ViewProps & { className?: string }> = ({ className, style, children, ...rest }) => {
  return (
    <StyledView className={className} style={style} {...rest}>
      {children}
    </StyledView>
  )
}

export default CustomView
