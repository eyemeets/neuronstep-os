// css/fonts.ts
import * as Font from 'expo-font'

// Import Excon fonts
import ExconThin from '../assets/fonts/excon/Excon-Thin.otf'
import ExconLight from '../assets/fonts/excon/Excon-Light.otf'
import ExconRegular from '../assets/fonts/excon/Excon-Regular.otf'
import ExconMedium from '../assets/fonts/excon/Excon-Medium.otf'
import ExconBold from '../assets/fonts/excon/Excon-Bold.otf'
import ExconBlack from '../assets/fonts/excon/Excon-Black.otf'

// Import Lora fonts
import LoraRegular from '../assets/fonts/lora/Lora-Regular.otf'
import LoraBold from '../assets/fonts/lora/Lora-Bold.otf'
import LoraItalic from '../assets/fonts/lora/Lora-Italic.otf'
import LoraBoldItalic from '../assets/fonts/lora/Lora-BoldItalic.otf'

// Import Outfit fonts
import OutfitRegular from '../assets/fonts/outfit/Outfit-Regular.otf'
import OutfitLight from '../assets/fonts/outfit/Outfit-Light.otf'
import OutfitMedium from '../assets/fonts/outfit/Outfit-Medium.otf'
import OutfitBold from '../assets/fonts/outfit/Outfit-Bold.otf'
import OutfitBlack from '../assets/fonts/outfit/Outfit-Black.otf'

// Function to load the fonts asynchronously
export const useLoadFonts = async () => {
  await Font.loadAsync({
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
  })
}
