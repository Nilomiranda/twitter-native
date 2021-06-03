import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(56, 161, 105)',
    accent: '#f1c40f',
    dark: '#222222',
  },
};

export const fontSizes = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
}

export default theme
