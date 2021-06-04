import { DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(56, 161, 105)',
    primaryLighter: '#9ca9aa',
    primaryDark: '#5E5E5E',
    primaryDarker: '#3d4c51',
    accent: '#ffffff',
    dark: '#222222',
    warning: '#f1c40f',
  },
}

export const fontSizes = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
}

export default theme
