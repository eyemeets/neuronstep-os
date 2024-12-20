// Define custom theme
// Docs: https://callstack.github.io/react-native-paper/docs/guides/theming

// Light theme configuration
export const lightThemeColors = {
  colors: {
    primary: '#ff5722', // Primary color for buttons, icons, and active elements
    accent: '#ff5722',
    onAccent: '#FFFFFF', // Text color on accent elements
    onPrimary: '#FFFFFF', // Text color on primary elements (e.g., buttons)
    primaryContainer: '#FCD7C2', // Slightly stronger background for elevated elements (TextInput)
    onPrimaryContainer: '#4D2C1A', // Text on top of primary containers (input placeholders)
    secondary: '#D6B29E', // Secondary color for less prominent UI elements
    onSecondary: '#4F3929', // Text on secondary elements
    secondaryContainer: '#E9C8B1', // Stronger background for secondary elements like cards
    onSecondaryContainer: '#6B4F36', // Text color on secondary containers
    tertiary: '#CDA276', // Tertiary color for accents or tertiary actions
    onTertiary: '#FFFFFF', // Text color on tertiary elements
    tertiaryContainer: '#FDE5CD', // Background color for tertiary containers
    onTertiaryContainer: '#6E4B34', // Text color on tertiary containers
    error: '#BA1A1A', // Error color for validation errors and error messages
    onError: '#FFFFFF', // Text color on error elements
    errorContainer: '#FFDAD6', // Background color for error containers
    onErrorContainer: '#410002', // Text color on error containers

    background: '#ececec', // Background color for screens or views
    onBackground: '#4A454E', // Text color on background elements
    surface: '#F9F5F2', // Surface color for cards, dialogs, modals
    onSurface: '#1D1B1E', // Text color on surface elements
    surfaceVariant: '#E9DFEB', // Variant surface color for outlines, dividers, or low-emphasis elements
    onSurfaceVariant: '#4A454E', // Text color on surface variant elements
    outline: '#7C757E', // Color for borders and dividers
    outlineVariant: '#CCC4CE', // Variant outline color for additional borders
    shadow: '#000000', // Shadow color for elevated elements (e.g., floating buttons)
    scrim: '#000000', // Scrim color for modal overlays or backdrop
    inverseSurface: '#322F33', // Inverse surface color for elements like snackbars
    inverseOnSurface: '#F5EFF4', // Text color on inverse surfaces
    inversePrimary: '#F28C63', // Primary color used in inverted components (e.g., dark mode)
    elevation: {
      level0: 'transparent', // No elevation (flat elements)
      level1: '#F8F2FB', // Slight elevation (e.g., cards)
      level2: '#F4ECF8', // Higher elevation for floating elements
      level3: '#F0E7F6', // Even higher elevation for shadows
      level4: '#EFE5F5', // Maximum elevation level
      level5: '#ECE2F3' // Deepest elevation level
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)', // Background color for disabled surfaces
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)', // Text color on disabled surfaces
    backdrop: 'rgba(51, 47, 55, 0.4)', // Backdrop color for modal or dialog overlays
    headerTitle: '#fff',
    headerBackground: '#FF5722', // Shared property for header background color in light theme
    drawerBackground: '#ececec', // Shared property for header background color in dark theme
    defaultIcon: '#ececec'
  }
}

// Dark theme configuration
export const darkThemeColors = {
  colors: {
    primary: '#ff5722', // Primary color for buttons, icons, and active elements
    accent: '#FF5722', // Accent color
    onAccent: '#FFFFFF', // Text color on accent elements
    onPrimary: '#FFFFFF', // Text color on primary elements (e.g., buttons)
    primaryContainer: '#4A454E', // Background color for elevated elements (e.g., text input background)
    onPrimaryContainer: '#FDE2D4', // Text on top of primary containers (e.g., input placeholders)
    secondary: '#1DB954', // Spotify's green for secondary elements (e.g., buttons, chips)
    onSecondary: '#FFFFFF', // Text on secondary elements
    secondaryContainer: '#333333', // Dark grey background for secondary elements
    onSecondaryContainer: '#B3B3B3', // Text color on secondary containers
    tertiary: '#CDA276', // Tertiary color for accents or tertiary actions
    onTertiary: '#FFFFFF', // Text color on tertiary elements
    tertiaryContainer: '#7E4E2A', // Background color for tertiary containers
    onTertiaryContainer: '#FDE5CD', // Text color on tertiary containers
    error: '#FF4F4F', // Error color for validation errors and error messages
    onError: '#1E1E1E', // Text color on error elements
    errorContainer: '#93000A', // Background color for error containers
    onErrorContainer: '#FFB4AB', // Text color on error containers
    background: '#1D1B1E', // Spotify's dark background for screens or views
    onBackground: '#E7E1E5', // Text color on background elements
    surface: '#181818', // Surface color for cards, dialogs, modals
    onSurface: '#E7E1E5', // Text color on surface elements
    surfaceVariant: '#282828', // Variant surface color for outlines, dividers, or low-emphasis elements
    onSurfaceVariant: '#B3B3B3', // Text color on surface variant elements
    outline: '#535353', // Color for borders and dividers
    outlineVariant: '#4A454E', // Variant outline color for additional borders
    shadow: '#000000', // Shadow color for elevated elements (e.g., floating buttons)
    scrim: '#000000', // Scrim color for modal overlays or backdrop
    inverseSurface: '#E7E1E5', // Inverse surface color for elements like snackbars
    inverseOnSurface: '#121212', // Text color on inverse surfaces
    inversePrimary: '#F28C63', // Primary color used in inverted components (e.g., dark mode)
    elevation: {
      level0: 'transparent', // No elevation (flat elements)
      level1: '#272329', // Slight elevation (e.g., cards)
      level2: '#2C2830', // Higher elevation for floating elements
      level3: '#322C37', // Even higher elevation for shadows
      level4: '#342E39', // Maximum elevation level
      level5: '#38313E' // Deepest elevation level
    },
    surfaceDisabled: 'rgba(231, 225, 229, 0.12)', // Background color for disabled surfaces
    onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)', // Text color on disabled surfaces
    backdrop: 'rgba(51, 47, 55, 0.4)', // Backdrop color for modal or dialog overlays
    headerTitle: '#FF5722',
    headerBackground: '#121212', // Shared property for header background color in dark theme
    drawerBackground: '#121212', // Shared property for header background color in dark theme
    defaultIcon: '#ff5722'
  }
}
