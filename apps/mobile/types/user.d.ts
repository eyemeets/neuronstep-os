import type { ParamListBase } from '@react-navigation/native'

// Define the correct parameter types for each route in the stack
export interface UserStackParamList extends ParamListBase {
  Chapters: undefined
  Content: { chapterId: number } // Specify the expected parameters for the Content screen
  Prompt: undefined
}
