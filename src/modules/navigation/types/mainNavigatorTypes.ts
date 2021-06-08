import { StackNavigationProp } from '@react-navigation/stack'

export type MainStackParamList = {
  Login: undefined
  SignUp: undefined
  TabNavigator: undefined
  UserProfile: {
    userId: number
  }
}

export type MainNavigationProps<CurrentRoute extends keyof MainStackParamList> =
  StackNavigationProp<MainStackParamList, CurrentRoute>
