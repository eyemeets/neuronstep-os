// Create a generic type for the props to make it reusable
export interface ScreenProps<T extends keyof UserStackParamList> {
  route: RouteProp<UserStackParamList, T>
}
