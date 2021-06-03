import React from 'react'
import { Button, Divider } from 'react-native-paper'
import styled from 'styled-components/native'
import CompanyHeader from '../components/CompanyHeader'
import LinkButton from '../../common/components/LinkButton'
import Text from '../../common/components/Text'
import { MainNavigationProps } from '../../navigation/types/mainNavigatorTypes'
import SecureInput from '../../common/components/SecureInput'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../common/components/Input'

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

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('This field is required'),
  nickname: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
})

const Login = ({ navigation }: LoginProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const handleNavigateToSignUpClick = () => {
    navigation?.navigate('SignUp')
  }

  const handleLoginPress = (data) => {
    console.log('errors', errors)
    console.log('data', data)
  }

  return (
    <MainView>
      <CompanyHeader subheading="Chist" />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="Your account's email"
            error={errors?.email?.message}
            style={{ marginBottom: 24, marginTop: 32 }}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
          />
        )}
      />

      <DividerContainer style={{ marginBottom: 24 }}>
        <Divider style={{ flex: 1 }} />
        <Text style={{ paddingHorizontal: 8 }}>Or</Text>
        <Divider style={{ flex: 1 }} />
      </DividerContainer>

      <Controller
        control={control}
        name="nickname"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nickname"
            placeholder="Your nickname"
            style={{ marginBottom: 24 }}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
            error={errors?.nickname?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <SecureInput
            label="Password"
            placeholder="Your password"
            style={{ marginBottom: 24 }}
            onChangeText={(value) => onChange(value)}
            value={value}
            error={errors?.password?.message}
          />
        )}
      />
      <Button
        mode="contained"
        style={{ marginBottom: 24 }}
        onPress={handleSubmit(handleLoginPress)}
      >
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
