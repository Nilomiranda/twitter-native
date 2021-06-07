import React from 'react'
import { StyleProp, Text as NativeText, TextStyle } from 'react-native'
import theme, { fontSizes } from '../../../config/theme'

type color = keyof typeof theme.colors

interface TextProps {
  children: React.ReactNode
  color?: color
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  style?: StyleProp<TextStyle>
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}

const Text = ({
  children,
  style,
  color = 'dark',
  fontSize = 'md',
  weight = 'normal',
}: TextProps) => {
  return (
    <NativeText
      style={{
        ...(style as any),
        color: theme?.colors[color],
        fontSize: fontSizes[fontSize],
        fontWeight: weight,
      }}
    >
      {children}
    </NativeText>
  )
}

export default Text
