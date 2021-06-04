import { StackNavigationProp } from '@react-navigation/stack'

export type MainStackParamList = {
  Login: undefined
  SignUp: undefined
  TabNavigator: undefined
}

export type MainNavigationProps<CurrentRoute extends keyof MainStackParamList> =
  StackNavigationProp<MainStackParamList, CurrentRoute>
