import React from 'react'
import { createContext, useState } from 'react'
import { useQuery } from 'react-query'
import { User } from '../interfaces/user'

interface UserContextTypes {
  user: User | undefined | null
  newAccount: boolean
  // eslint-disable-next-line no-unused-vars
  setIsNewAccount: (value?: boolean | undefined) => void
}

export const UserContext = createContext<UserContextTypes>({
  user: null,
  newAccount: false,
  setIsNewAccount: () => null,
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false)

  const { data: userData } = useQuery<{ user: User }>('sessions')

  const toggleNewAccountCreated = (value: boolean | undefined) => {
    setIsNewAccount(value || false)
  }

  return (
    <UserContext.Provider
      value={{
        user: userData?.user,
        newAccount: isNewAccount,
        setIsNewAccount: toggleNewAccountCreated,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
