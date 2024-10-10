import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '@/css/native-paper'

export function getPaperTheme() {
  const colorScheme = useColorScheme()

  // Use custom theme definitions instead of useMaterial3Theme
  const paperTheme = colorScheme === 'dark' ? darkTheme : lightTheme

  return paperTheme
}
