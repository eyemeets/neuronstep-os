import type { ParamListBase } from '@react-navigation/native'

// Updated index signature to avoid ParamListBase error
export interface AuthStackParamList extends ParamListBase {
  [key: string]: object | undefined // Index signature fix
  Login: undefined
  Register: undefined
}
