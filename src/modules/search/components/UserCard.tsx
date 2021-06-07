import React, { useContext } from 'react'
import { Avatar, Card } from 'react-native-paper'
import { UserContext } from '../../../contexts/CurrentUser'
import { User } from '../../../interfaces/user'

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user: loggedUser } = useContext(UserContext)

  return (
    <Card>
      <Card.Title
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{
              uri:
                user?.profile_picture_url || 'https://i.imgur.com/nxEmMOS.png',
            }}
          />
        )}
        title={user?.nickname}
      />
    </Card>
  )
}

export default UserCard
