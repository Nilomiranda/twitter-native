import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'
import { useForm, Controller } from 'react-hook-form'
import CompanyHeader from '../components/CompanyHeader'
import LinkButton from '../../common/components/LinkButton'
import Text from '../../common/components/Text'
import { MainNavigationProps } from '../../navigation/types/mainNavigatorTypes'
import SecureInput from '../../common/components/SecureInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../../common/components/Input'
import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios'
import { Session } from '../../../interfaces/session'
import { signIn, SignInPayload } from '../../../services/session'
import { User } from '../../../interfaces/user'
import { createUser, SignUpPayload } from '../../../services/user'
import { translateErrors } from '../../../utils/translateErrors'
import useToast from '../../../hooks/useToast'

const MainView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'stretch',
    paddingBottom: 60,
  },
})`
  padding: 16px 32px;
`

interface SignUpProps {
  navigation: MainNavigationProps<'SignUp'>
}

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('This field is required'),
  nickname: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  passwordConfirmation: yup
    .string()
    .test(
      'password-confirmation',
      'Confirmation password must match',
      function (value) {
        return !(this.parent.password && this.parent.password !== value)
      }
    ),
})

const SignUp = ({ navigation }: SignUpProps) => {
  const [signingUp, setSigningUp] = useState<boolean>(false)
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

  const signUpMutation = useMutation<
    AxiosResponse<{ user: User }>,
    unknown,
    SignUpPayload
  >((signUpPayload) => createUser(signUpPayload))

  const handleNavigateToSignInClick = () => {
    navigation?.navigate('Login')
  }

  const handleCreateAccountClick = async ({
    email,
    nickname,
    password,
  }: {
    email: string
    nickname: string
    password: string
  }) => {
    setSigningUp(true)
    try {
      await signUpMutation.mutateAsync({ email, nickname, password })
      const sessionResponse = await loginMutation.mutateAsync({
        email,
        nickname,
        password,
      })
      if (sessionResponse?.data?.data?.token) {
        navigation?.navigate('TabNavigator')
      }
    } catch (err) {
      console.log('sign up error', err)
      toast.show({
        kind: 'error',
        message:
          translateErrors(err?.response?.data?.errors) ||
          'An unexpected error occurred. Please try again later',
      })
    } finally {
      setSigningUp(false)
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
            placeholder="The best email you have"
            style={{ marginBottom: 24, marginTop: 32 }}
            error={errors?.email?.message}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="nickname"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nickname"
            placeholder="A super creative nickname"
            style={{ marginBottom: 24 }}
            error={errors?.nickname?.message}
            onChangeText={(value) => onChange(value)}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <SecureInput
            label="Password"
            placeholder="A password strong as vibranium"
            style={{ marginBottom: 24 }}
            error={errors?.password?.message}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="passwordConfirmation"
        render={({ field: { onChange, value } }) => (
          <SecureInput
            label="Password confirmation"
            placeholder="Confirm that vibranium strong password"
            style={{ marginBottom: 24 }}
            error={errors?.passwordConfirmation?.message}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Button
        mode="contained"
        style={{ marginBottom: 24 }}
        onPress={handleSubmit(handleCreateAccountClick)}
        loading={signingUp}
        disabled={signingUp}
      >
        Create account
      </Button>
      <Text color="dark">Already have an account? Awesome!</Text>
      <LinkButton onPress={handleNavigateToSignInClick}>
        Let's sign in then
      </LinkButton>
    </MainView>
  )
}

export default SignUp
