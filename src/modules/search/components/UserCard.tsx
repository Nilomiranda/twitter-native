import React, { useContext } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { UserContext } from '../../../contexts/CurrentUser'
import { User } from '../../../interfaces/user'
import styled from 'styled-components/native'
import useFollow from '../../../hooks/useFollow'
import Text from '../../common/components/Text'
import { MainNavigationProps } from '../../navigation/types/mainNavigatorTypes'
import { useNavigation } from '@react-navigation/native'

const Card = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const Actions = styled.View`
  flex-direction: row;
  margin-left: auto;
`

const UserAvatar = styled(Avatar.Image)`
  margin-right: 20px;
`

const FollowButton = styled(Button)`
  margin-left: auto;
`

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const { user: loggedUser } = useContext(UserContext)
  const [isFollowing, toggleFollowing] = useFollow(user?.id)
  const navigation = useNavigation<MainNavigationProps<'TabNavigator'>>()

  const handleUserPress = () => {
    if (user?.id) {
      navigation?.navigate('UserProfile', { userId: user.id })
    }
  }

  return (
    <Card onPress={handleUserPress}>
      <UserAvatar
        size={48}
        source={{
          uri: user?.profile_picture_url || 'https://i.imgur.com/nxEmMOS.png',
        }}
      />
      <Text fontSize="lg" weight="400">
        {user?.nickname}
      </Text>
      <Actions>
        {loggedUser?.id !== user?.id ? (
          <FollowButton
            mode={isFollowing ? 'text' : 'contained'}
            uppercase={false}
            onPress={toggleFollowing}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </FollowButton>
        ) : null}
      </Actions>
    </Card>
  )
}

export default UserCard
