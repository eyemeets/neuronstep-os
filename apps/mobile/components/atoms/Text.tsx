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
  textType?: 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'paragraph' 
  | 'small' 
  | 'largeTitle' 
  | 'mediumTitle' 
  | 'smallTitle' 
  | 'largeBody' 
  | 'mediumBody' 
  | 'smallBody' 
  | 'caption' 
  | 'overline' 
  | 'button' // Add all the new custom types here
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
      case 'largeTitle':
        return { fontSize: 36, fontWeight: 'bold', fontFamily: 'Lora-Bold' }
      case 'mediumTitle':
        return { fontSize: 28, fontWeight: 'bold', fontFamily: 'Lora-Bold' }
      case 'smallTitle':
        return { fontSize: 24, fontWeight: '500', fontFamily: 'Lora-Regular' }
      case 'largeBody':
        return { fontSize: 18, fontWeight: '400', fontFamily: 'Outfit-Regular' }
      case 'mediumBody':
        return { fontSize: 16, fontWeight: '400', fontFamily: 'Outfit-Regular' }
      case 'smallBody':
        return { fontSize: 14, fontWeight: '300', fontFamily: 'Outfit-Light' }
      case 'caption':
        return { fontSize: 12, fontWeight: '300', fontFamily: 'Outfit-Light', letterSpacing: 0.5 }
      case 'overline':
        return { fontSize: 10, fontWeight: '500', fontFamily: 'Outfit-Regular', textTransform: 'uppercase' }
      case 'button':
        return { fontSize: 16, fontWeight: '500', fontFamily: 'Outfit-Medium', textTransform: 'uppercase' }
      default:
        return { fontSize: 16, fontFamily: 'Outfit-Regular' } // Default to regular paragraph
    }
  }

  // If variant is defined, don't use the textType styles
  const combinedStyle: TextStyle = variant
    ? { color: theme.colors.onBackground || '#fff', ...style } // Use variant's built-in styles
    : {
        ...getTextTypeStyle(), // Apply textType styles if no variant is used
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
        variant={variant} // Pass the variant prop to Paper's Text component if provided
        {...rest}
      >
        {value ? value : children}
      </StyledText>
    </Animated.View>
  )
}

export default CustomText
