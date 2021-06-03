import React from 'react';
import { Text as NativeText } from 'react-native'
import theme, {fontSizes} from "../../../config/theme";

type color = keyof typeof theme.colors

interface TextProps {
  children: React.ReactNode
  color?: color
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Text = ({ children, color = 'primary', fontSize = 'md' }: TextProps) => {
  return (
    <NativeText style={{ color: theme?.colors[color], fontSize: fontSizes[fontSize] }}>{children}</NativeText>
  )
}

export default Text
