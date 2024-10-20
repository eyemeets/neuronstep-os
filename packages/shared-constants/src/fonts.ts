export type FontWeight = '300' | '400' | '500' | '700' | 'normal' | 'bold' | '100' | '200' | '600' | '800' | '900' | undefined

export interface FontStyle {
  fontFamily: string
  fontWeight: FontWeight
  fontSize: number
  lineHeight: number
  letterSpacing: number
}

export interface FontConfig {
  config: {
    [key: string]: FontStyle
  }
}

export const fontConfig: FontConfig = {
  config: {
    displayLarge: {
      fontFamily: 'Lora-Bold',
      fontWeight: '700',
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: 0
    },
    displayMedium: {
      fontFamily: 'Lora-Bold',
      fontWeight: '700',
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0
    },
    displaySmall: {
      fontFamily: 'Lora-Bold',
      fontWeight: '700',
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0
    },
    headlineLarge: {
      fontFamily: 'Lora-BoldItalic',
      fontWeight: '700',
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0
    },
    headlineMedium: {
      fontFamily: 'Lora-Regular',
      fontWeight: '400',
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0
    },
    headlineSmall: {
      fontFamily: 'Lora-Bold',
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0
    },
    titleLarge: {
      fontFamily: 'Outfit-Regular',
      fontWeight: '400',
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0
    },
    titleMedium: {
      fontFamily: 'Outfit-Medium',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15
    },
    titleSmall: {
      fontFamily: 'Outfit-Medium',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1
    },
    labelLarge: {
      fontFamily: 'Outfit-Light',
      fontWeight: '300',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1
    },
    labelMedium: {
      fontFamily: 'Outfit-Light',
      fontWeight: '300',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5
    },
    labelSmall: {
      fontFamily: 'Outfit-Light',
      fontWeight: '300',
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5
    },
    bodyLarge: {
      fontFamily: 'Outfit-Regular',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5
    },
    bodyMedium: {
      fontFamily: 'Outfit-Medium',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25
    },
    bodySmall: {
      fontFamily: 'Outfit-Regular',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4
    }
  }
}