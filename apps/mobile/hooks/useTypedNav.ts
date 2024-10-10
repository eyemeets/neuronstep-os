// src/types/navigation.ts
import type { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation as useReactNavigation } from '@react-navigation/native'
import type { ParamListBase } from '@react-navigation/routers'

// Define a generic type for StackNavigationProp
export type UseStackNavigation<T extends ParamListBase> = StackNavigationProp<T>

// Create a reusable hook for typed navigation
export const useTypedNavigation = <T extends ParamListBase>() =>
  useReactNavigation<UseStackNavigation<T>>()
