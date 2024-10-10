import React, { useEffect, useRef } from 'react'
import { Text as PaperText } from 'react-native-paper'
import { Animated, Keyboard, Easing } from 'react-native'
import { styled } from 'nativewind'
import type { TextStyle } from 'react-native'
import { getPaperTheme } from '@/hooks/useThemeColor'

// Create a styled version of Paper's Text component
const StyledText = styled(PaperText)

type TextVariants =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'

interface CustomTextProps extends Omit<React.ComponentProps<typeof PaperText>, 'children' | 'variant'> {
  className?: string
  value?: string | number
  style?: TextStyle
  children?: React.ReactNode
  textType?: 'h1' | 'h2' | 'h3' | 'paragraph' | 'small'
  fontWeight?: 'bold' | 'normal' | 'light'
  fontStyle?: 'italic' | 'normal'
  variant?: TextVariants // Accept the variant prop with specific values
}

const CustomText: React.FC<CustomTextProps> = ({
  className,
  value,
  children,
  textType = 'paragraph',
  fontWeight = 'normal',
  fontStyle = 'normal',
  variant,
  style,
  ...rest
}) => {
  const animatedOpacity = useRef(new Animated.Value(1)).current
  const theme = getPaperTheme()

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    })

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    })

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [ animatedOpacity ])

  // Define styles based on the textType and assign the appropriate font family
  const getTextTypeStyle = (): TextStyle => {
    switch (textType) {
      case 'h1':
        return { fontSize: 32, fontWeight: 'bold', fontFamily: 'Lora-Bold' }
      case 'h2':
        return { fontSize: 28, fontWeight: 'bold', fontFamily: 'Lora-Bold' }
      case 'h3':
        return { fontSize: 24, fontWeight: 'bold', fontFamily: 'Lora-Regular' }
      case 'small':
        return { fontSize: 14, fontFamily: 'Outfit-Light' }
      case 'paragraph':
      default:
        return { fontSize: 16, fontFamily: 'Outfit-Regular' }
    }
  }

  const combinedStyle: TextStyle = {
    ...getTextTypeStyle(),
    fontWeight,
    fontStyle,
    color: theme.colors.onBackground || '#fff', // Ensure the correct theme color is applied
    ...style // Apply additional custom styles
  }

  return (
    <Animated.View style={{ opacity: animatedOpacity }}>
      <StyledText
        className={className}
        style={combinedStyle}
        variant={variant} // Pass the variant prop to Paper's Text component
        {...rest}
      >
        {value ? value : children}
      </StyledText>
    </Animated.View>
  )
}

export default CustomText
