import React from 'react'
import { TextInput } from 'react-native-paper'
import { StyleProp, TextStyle } from 'react-native'
import styled from 'styled-components/native'
import Text from './Text'

const InputWrapper = styled.View<{ style: any }>`
  align-items: stretch;
  justify-content: flex-start;
`

interface InputProps {
  label?: string
  placeholder?: string
  error?: string
  style?: StyleProp<TextStyle>
  inputStyle?: StyleProp<TextStyle>
  onChangeText?: (value: string) => void
  value?: string
  multiline?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const Input = ({
  label,
  placeholder,
  error,
  style = {},
  inputStyle = {},
  onChangeText,
  value,
  autoCapitalize = 'sentences',
  multiline = false,
}: InputProps) => {
  return (
    <InputWrapper style={style}>
      <TextInput
        label={label}
        placeholder={placeholder}
        error={!!error}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        style={inputStyle}
        multiline={multiline}
      />
      {error ? (
        <Text color={'error'} fontSize={'sm'} style={{ marginTop: 8 }}>
          {error}
        </Text>
      ) : null}
    </InputWrapper>
  )
}

export default Input
