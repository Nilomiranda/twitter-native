import React from 'react'
import { Button, Divider, TextInput } from 'react-native-paper'
import styled from 'styled-components/native'
import CompanyHeader from '../components/CompanyHeader'
import LinkButton from '../../common/components/LinkButton'
import Text from '../../common/components/Text'
import { MainNavigationProps } from '../../navigation/types/mainNavigatorTypes'
import SecureInput from '../../common/components/SecureInput'

const MainView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'stretch',
    paddingBottom: 60,
  },
})`
  padding: 16px 32px;
`

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

interface LoginProps {
  navigation: MainNavigationProps<'Login'>
}

const Login = ({ navigation }: LoginProps) => {
  const handleNavigateToSignUpClick = () => {
    navigation?.navigate('SignUp')
  }

  return (
    <MainView>
      <CompanyHeader subheading="Chist" />
      <TextInput
        label="Email"
        placeholder="Your account's email"
        style={{ marginBottom: 24, marginTop: 32 }}
      />

      <DividerContainer style={{ marginBottom: 24 }}>
        <Divider style={{ flex: 1 }} />
        <Text style={{ paddingHorizontal: 8 }}>Or</Text>
        <Divider style={{ flex: 1 }} />
      </DividerContainer>

      <TextInput
        label="Nickname"
        placeholder="Your nickname"
        style={{ marginBottom: 24 }}
      />
      <SecureInput
        label="Password"
        placeholder="Your password"
        style={{ marginBottom: 24 }}
      />
      <Button mode="contained" style={{ marginBottom: 24 }}>
        Login
      </Button>
      <Text color="dark">Don't have an account? </Text>
      <LinkButton onPress={handleNavigateToSignUpClick}>
        Let's create one then
      </LinkButton>
    </MainView>
  )
}

export default Login
