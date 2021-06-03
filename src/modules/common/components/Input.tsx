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
  style: StyleProp<TextStyle>
  onChangeText?: (value: string) => void
  value?: string
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const Input = ({
  label,
  placeholder,
  error,
  style = {},
  onChangeText,
  value,
  autoCapitalize = 'words',
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
