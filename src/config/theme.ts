import { DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(56, 161, 105)',
    accent: '#f1c40f',
    dark: '#222222',
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
