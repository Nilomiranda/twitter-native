import React from 'react'
import {Button, TextInput} from "react-native-paper";
import styled from "styled-components/native";
import CompanyHeader from "../components/CompanyHeader";
import LinkButton from "../../common/components/LinkButton";
import Text from "../../common/components/Text";
import {MainNavigationProps} from "../../navigation/types/mainNavigatorTypes";
import SecureInput from "../../common/components/SecureInput";

const MainView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'stretch',
    paddingBottom: 60
  },
})`
  padding: 16px 32px;
`

interface SignUpProps {
  navigation: MainNavigationProps<'SignUp'>
}

const SignUp = ({navigation}: SignUpProps) => {
  const handleNavigateToSignInClick = () => {
    navigation?.navigate('Login')
  }

  return (
      <MainView>
        <CompanyHeader subheading="Chist" />
        <TextInput label="Email" placeholder="The best email you have" style={{ marginBottom: 24, marginTop: 32 }}  />
        <TextInput label="Nickname" placeholder="A super creative nickname" style={{ marginBottom: 24 }}  />
        <SecureInput label="Password" placeholder="A password strong as vibranium" style={{ marginBottom: 24 }} />
        <SecureInput label="Password confirmation" placeholder="Confirm that vibranium strong password" style={{ marginBottom: 24 }} />
        <Button mode="contained" style={{ marginBottom: 24 }}>Create account</Button>
        <Text color="dark">Already have an account? Awesome!</Text><LinkButton onPress={handleNavigateToSignInClick}>Let's sign in then</LinkButton>
      </MainView>
  )
}

export default SignUp
