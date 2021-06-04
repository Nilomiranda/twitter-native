import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from '../authentication/screens/Login'
import SignUp from '../authentication/screens/SignUp'
import React, { useEffect, useState } from 'react'
import { MainStackParamList } from './types/mainNavigatorTypes'
import { AsyncStorageKey } from '../../config/asyncStorageKeys'
import CheckingSession from '../authentication/screens/CheckingSession'
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator<MainStackParamList>()

const MainNavigator = () => {
  const [checkingSession, setCheckingSession] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    const checkToken = () => {
      AsyncStorage.getItem(AsyncStorageKey.SESSION_TOKEN)
        .then((tokenInStorage) => {
          setToken(tokenInStorage || '')
        })
        .catch((err) => {
          console.log('error when checking for session token', err)
        })
        .finally(() => {
          setCheckingSession(false)
        })
    }

    checkToken()
  }, [])

  if (checkingSession) {
    return <CheckingSession />
  }

  return (
    <Stack.Navigator initialRouteName={token ? 'TabNavigator' : 'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerLeft: () => null, title: 'Chist' }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
