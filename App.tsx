import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';
import theme from "./src/config/theme";
import MainNavigator from "./src/modules/navigation/MainNavigator";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
