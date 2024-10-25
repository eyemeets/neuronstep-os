

import { configureFonts, MD3LightTheme, MD3DarkTheme } from 'react-native-paper'
import { fontConfig, lightThemeColors, darkThemeColors } from '@repo/shared-ui'

// Define custom theme
// Docs: https://callstack.github.io/react-native-paper/docs/guides/theming

// Light theme configuration
export const lightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig.config }),
  ...lightThemeColors
}

export const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig.config }),
  ...darkThemeColors
}
