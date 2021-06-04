import React, { useState } from 'react'
import { Button, Divider } from 'react-native-paper'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CompanyHeader from '../components/CompanyHeader'
import LinkButton from '../../common/components/LinkButton'
import Text from '../../common/components/Text'
import { MainNavigationProps } from '../../navigation/types/mainNavigatorTypes'
import SecureInput from '../../common/components/SecureInput'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../common/components/Input'
import { useMutation } from 'react-query'
import { signIn, SignInPayload } from '../../../services/session'
import { Session } from '../../../interfaces/session'
import { AxiosResponse } from 'axios'
import { translateErrors } from '../../../utils/translateErrors'
import useToast from '../../../hooks/useToast'
import { AsyncStorageKey } from '../../../config/asyncStorageKeys'

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
  email: yup
    .string()
    .email('Invalid email')
    .test('nickname-present', 'Email is required', function (value) {
      return !(!this.parent.nickname && !value)
    }),
  nickname: yup
    .string()
    .test('email-present', 'Nickname is required', function (value) {
      return !(!this.parent.email && !value)
    }),
  password: yup.string().required('This field is required'),
})

const Login = ({ navigation }: LoginProps) => {
  const [signingIn, setSigningIn] = useState<boolean>(false)
  const toast = useToast()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const loginMutation = useMutation<
    AxiosResponse<{ data: Session }>,
    unknown,
    SignInPayload
  >((signInPayload) => signIn(signInPayload))

  const handleNavigateToSignUpClick = () => {
    navigation?.navigate('SignUp')
  }

  const handleLoginPress = async ({
    email,
    nickname,
    password,
  }: {
    email: string
    nickname: string
    password: string
  }) => {
    setSigningIn(true)

    try {
      const sessionResponse = await loginMutation?.mutateAsync({
        email,
        nickname,
        password,
      })

      if (sessionResponse?.data?.data?.token) {
        AsyncStorage.setItem(
          AsyncStorageKey.SESSION_TOKEN,
          sessionResponse?.data?.data?.token
        )
        navigation?.navigate('Feed')
      }
    } catch (err) {
      console.log('sign in error', err)
      toast.show({
        kind: 'error',
        message:
          translateErrors(err?.response?.data?.errors) ||
          'An unexpected error occurred. Please try again later',
      })
    } finally {
      setSigningIn(false)
    }
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
        loading={signingIn}
        disabled={signingIn}
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
