import { createStackNavigator } from '@react-navigation/stack'
import Login from '../authentication/screens/login'
import SignUp from '../authentication/screens/signUp'
import React from 'react'
import { MainStackParamList } from './types/mainNavigatorTypes'
import Feed from '../feed/screens/Feed'

const Stack = createStackNavigator<MainStackParamList>()

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  )
}

export default MainNavigator
