import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  MainNavigationProps,
  MainStackParamList,
} from '../../navigation/types/mainNavigatorTypes'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from 'react-query'
import { User } from '../../../interfaces/user'
import styled from 'styled-components/native'
import theme from '../../../config/theme'
import { ActivityIndicator } from 'react-native-paper'
import ProfileCard from '../components/ProfileCard'
import PublicationsList from '../../feed/components/PublicationsList'
import { Tweet } from '../../../interfaces/tweet'

const MainContainer = styled.View`
  flex: 1;
  background: ${() => theme?.colors?.accent};
  padding: 16px;
  align-items: stretch;
`

interface ProfilePageProps {
  navigation: MainNavigationProps<'UserProfile'>
  route: RouteProp<MainStackParamList, 'UserProfile'>
}

const Profile = ({ navigation, route }: ProfilePageProps) => {
  const { data, isLoading } = useQuery<{ user: User }>(
    `users/${route?.params?.userId}`,
    {
      enabled: !!route?.params?.userId,
    }
  )

  const [page, setPage] = useState(1)
  const { data: feedData, isLoading: isLoadingFeed } = useQuery<{
    feed: Tweet[]
  }>(
    [
      'feed',
      {
        page,
        user_id: data?.user?.id,
      },
    ],
    { enabled: !!data?.user?.id }
  )
  const [loadedPublications, setLoadedPublications] = useState<Tweet[]>([])

  const handleLoadMore = async () => {
    setPage((currentPage) => currentPage + 1)
  }

  useEffect(() => {
    if (page === 1) {
      setLoadedPublications(feedData?.feed || [])
      return
    }

    if (page > 1) {
      setLoadedPublications((previouslyLoadedPublications) =>
        previouslyLoadedPublications.concat(feedData?.feed || [])
      )
      return
    }
  }, [feedData?.feed])

  useLayoutEffect(() => {
    navigation?.setOptions({ headerTitle: data?.user?.nickname })
  }, [navigation, route, data?.user?.nickname])

  return (
    <MainContainer>
      {isLoading ? (
        <ActivityIndicator animating={true} color={theme?.colors?.primary} />
      ) : null}

      {data?.user ? (
        <>
          <ProfileCard user={data?.user} />
          <PublicationsList
            publications={loadedPublications}
            onLoadMore={handleLoadMore}
            loading={isLoadingFeed}
          />
        </>
      ) : null}
    </MainContainer>
  )
}

export default Profile
