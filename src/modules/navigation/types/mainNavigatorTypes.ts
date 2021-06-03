import { StackNavigationProp } from '@react-navigation/stack'

export type MainStackParamList = {
  Login: undefined
  SignUp: undefined
  Feed: undefined
}

export type MainNavigationProps<CurrentRoute extends keyof MainStackParamList> =
  StackNavigationProp<MainStackParamList, CurrentRoute>
