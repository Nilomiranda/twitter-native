import React, { useContext } from 'react'
import Text from '../../common/components/Text'
import { Avatar, Button } from 'react-native-paper'
import styled from 'styled-components/native'
import { User } from '../../../interfaces/user'
import useFollow from '../../../hooks/useFollow'
import { UserContext } from '../../../contexts/CurrentUser'

const MainContainer = styled.View`
  align-items: center;
  padding-bottom: 16px;
`

const UserAvatar = styled(Avatar.Image)`
  margin-bottom: 20px;
`

const SocialInformationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const SocialInformation = styled.View`
  padding: 0 8px;
`

interface ProfileCardProps {
  user: User
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const { user: loggedUser } = useContext(UserContext)
  const [isFollowing, toggleFollowing] = useFollow(user?.id || 0)

  const handleEditProfilePress = () => {
    return null
  }

  return (
    <MainContainer>
      <UserAvatar
        size={60}
        source={{
          uri: user?.profile_picture_url || 'https://i.imgur.com/nxEmMOS.png',
        }}
      />
      <Text fontSize="xl" weight="bold" style={{ marginBottom: 20 }}>
        {user?.nickname}
      </Text>

      <SocialInformationContainer>
        <SocialInformation>
          <Text>Following</Text>
          <Text fontSize="xl" weight="bold">
            {user?.following_count}
          </Text>
        </SocialInformation>

        <SocialInformation>
          <Text>Followers</Text>
          <Text fontSize="xl" weight="bold">
            {user?.followers_count}
          </Text>
        </SocialInformation>
      </SocialInformationContainer>

      {loggedUser?.id !== user?.id ? (
        <Button
          uppercase={false}
          onPress={toggleFollowing}
          mode={isFollowing ? 'outlined' : 'contained'}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      ) : (
        <Button
          icon="pencil"
          mode="outlined"
          uppercase={false}
          onPress={handleEditProfilePress}
        >
          Edit profile
        </Button>
      )}
    </MainContainer>
  )
}

export default ProfileCard
