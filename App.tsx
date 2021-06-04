import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from './src/config/theme'
import MainNavigator from './src/modules/navigation/MainNavigator'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/config/queryClient'
import ToastProvider from './src/contexts/ToastProvider'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </QueryClientProvider>
  )
}
