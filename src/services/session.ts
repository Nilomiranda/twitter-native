import axios, { AxiosResponse } from 'axios'
import { httpClient } from '../config/queryClient'
import { User } from '../interfaces/user'
import { Session } from '../interfaces/session'

export interface SignInPayload {
  email: string
  password: string
  nickname: string
}

export const prefetchSession = async (
  req: any
): Promise<AxiosResponse<{ user: User }>> =>
  axios.get<{ user: User }>(`${process.env.API_URL}sessions`, {
    headers: req?.headers,
    withCredentials: true,
  })

export const signIn = async (
  payload: SignInPayload
): Promise<AxiosResponse<{ data: Session }>> =>
  httpClient.post('sessions', payload)

export const signOut = async () => httpClient.delete('sessions')
