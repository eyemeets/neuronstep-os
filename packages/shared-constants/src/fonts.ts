// css/fonts.ts
import * as Font from 'expo-font'

// Import Excon fonts
import ExconThin from './assets/fonts/excon/Excon-Thin.otf'
import ExconLight from './assets/fonts/excon/Excon-Light.otf'
import ExconRegular from './assets/fonts/excon/Excon-Regular.otf'
import ExconMedium from './assets/fonts/excon/Excon-Medium.otf'
import ExconBold from './assets/fonts/excon/Excon-Bold.otf'
import ExconBlack from './assets/fonts/excon/Excon-Black.otf'

// Import Lora fonts
import LoraRegular from './assets/fonts/lora/Lora-Regular.otf'
import LoraBold from './assets/fonts/lora/Lora-Bold.otf'
import LoraItalic from './assets/fonts/lora/Lora-Italic.otf'
import LoraBoldItalic from './assets/fonts/lora/Lora-BoldItalic.otf'

// Import Outfit fonts
import OutfitRegular from './assets/fonts/outfit/Outfit-Regular.otf'
import OutfitLight from './assets/fonts/outfit/Outfit-Light.otf'
import OutfitMedium from './assets/fonts/outfit/Outfit-Medium.otf'
import OutfitBold from './assets/fonts/outfit/Outfit-Bold.otf'
import OutfitBlack from './assets/fonts/outfit/Outfit-Black.otf'

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

// Function to load the fonts asynchronously
export const useLoadFonts = async (platform: 'mobile' | 'web') => {
  const fonts = {
    'Excon-Thin': ExconThin,
    'Excon-Light': ExconLight,
    'Excon-Regular': ExconRegular,
    'Excon-Medium': ExconMedium,
    'Excon-Bold': ExconBold,
    'Excon-Black': ExconBlack,
    'Lora-Regular': LoraRegular,
    'Lora-Bold': LoraBold,
    'Lora-Italic': LoraItalic,
    'Lora-BoldItalic': LoraBoldItalic,
    'Outfit-Regular': OutfitRegular,
    'Outfit-Light': OutfitLight,
    'Outfit-Medium': OutfitMedium,
    'Outfit-Bold': OutfitBold,
    'Outfit-Black': OutfitBlack
  }
  if (platform === 'web') {
    return await Font.loadAsync(fonts)
  }
}