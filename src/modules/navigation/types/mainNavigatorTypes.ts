import {StackNavigationProp} from "@react-navigation/stack";

export type MainStackParamList = {
  Login: undefined,
  SignUp: undefined,
}

export type MainNavigationProps<CurrentRoute extends keyof MainStackParamList> = StackNavigationProp<MainStackParamList, CurrentRoute>;
