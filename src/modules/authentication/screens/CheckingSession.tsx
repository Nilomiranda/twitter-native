import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native-paper'

const LoadingWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const CheckingSession = () => {
  return (
    <LoadingWrapper>
      <ActivityIndicator />
    </LoadingWrapper>
  )
}

export default CheckingSession
