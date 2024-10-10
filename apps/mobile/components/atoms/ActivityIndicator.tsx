import React from 'react'
import { ActivityIndicator as PaperActivityIndicator } from 'react-native-paper'
import { styled } from 'nativewind'
import { getPaperTheme } from '@/hooks/useThemeColor'
import type { StyleProp, ViewStyle } from 'react-native'

// Create a styled version of Paper's ActivityIndicator component
const StyledActivityIndicator = styled(PaperActivityIndicator)

// Define a custom component that supports all PaperActivityIndicator props, className, and style
interface CustomActivityIndicatorProps {
  className?: string
  color?: string
  size?: number | 'small' | 'large'
  animating?: boolean
  style?: StyleProp<ViewStyle> // Add support for the style prop
}

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({
  className,
  color,
  size = 'large',
  animating = true,
  style,
  ...rest
}) => {
  const theme = getPaperTheme()
  const activityIndicatorColor = color || theme.colors.primary || '#F28C63' // Default color if not provided

  return (
    <StyledActivityIndicator
      className={className}
      animating={animating}
      size={size}
      color={activityIndicatorColor}
      style={style} // Pass the style prop to the component
      {...rest}
    />
  )
}

export default CustomActivityIndicator
