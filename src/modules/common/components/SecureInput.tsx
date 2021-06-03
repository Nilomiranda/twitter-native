import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputChangeEventData,
  TextStyle,
} from 'react-native'
import styled from 'styled-components/native'
import Text from './Text'

const InputWrapper = styled.View<{ style: any }>`
  align-items: stretch;
  justify-content: flex-start;
`

interface SecureInputProps {
  label?: string
  placeholder?: string
  onChange?: (value: NativeSyntheticEvent<TextInputChangeEventData>) => void
  onChangeText?: (value: string) => void
  style?: StyleProp<TextStyle>
  value?: string
  error?: string
}

const SecureInput = ({ style, error, ...props }: SecureInputProps) => {
  const [showingSecurePassword, setShowingSecurePassword] = useState(false)

  const handleRevealSecureText = () => {
    setShowingSecurePassword(!showingSecurePassword)
  }

  return (
    <InputWrapper style={style}>
      <TextInput
        secureTextEntry={!showingSecurePassword}
        right={<TextInput.Icon onPress={handleRevealSecureText} name="eye" />}
        error={!!error}
        {...props}
      />
      {error ? (
        <Text color={'error'} fontSize={'sm'} style={{ marginTop: 8 }}>
          {error}
        </Text>
      ) : null}
    </InputWrapper>
  )
}

SecureInput.defaultProps = {
  label: '',
  placeholder: '',
  onChange: () => null,
  value: '',
}

export default SecureInput
