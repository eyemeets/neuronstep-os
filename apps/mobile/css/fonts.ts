import * as Font from 'expo-font'
import { fonts } from '@repo/shared-ui'

export const useLoadFonts = async () => {
  return await Font.loadAsync(fonts)
}
