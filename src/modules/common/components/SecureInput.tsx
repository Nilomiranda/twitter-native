import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputChangeEventData,
  TextStyle,
} from 'react-native'

interface SecureInputProps {
  label?: string
  placeholder?: string
  onChange?: (value: NativeSyntheticEvent<TextInputChangeEventData>) => void
  style?: StyleProp<TextStyle>
}

const SecureInput = ({ ...props }: SecureInputProps) => {
  const [showingSecurePassword, setShowingSecurePassword] = useState(false)

  const handleRevealSecureText = () => {
    setShowingSecurePassword(!showingSecurePassword)
  }

  return (
    <TextInput
      secureTextEntry={!showingSecurePassword}
      right={<TextInput.Icon onPress={handleRevealSecureText} name="eye" />}
      {...props}
    />
  )
}

SecureInput.defaultProps = {
  label: '',
  placeholder: '',
  onChange: () => null,
}

export default SecureInput
