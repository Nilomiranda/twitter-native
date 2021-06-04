import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Tweet } from '../../../interfaces/tweet'
import PublicationCard from './PublicationCard'
import { queryClient } from '../../../config/queryClient'

interface PublicationsListProps {
  publications: Tweet[]
  loading?: boolean
  onLoadMore?: () => void
}

const PublicationsList = ({
  publications = [],
  loading = false,
  onLoadMore = () => null,
}: PublicationsListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loadedPublications, setLoadedPublications] =
    useState<Tweet[]>(publications)

  const handleFeedRefresh = async () => {
    setIsRefreshing(true)
    await queryClient.refetchQueries('feed')
    setIsRefreshing(false)
  }

  const handlePublicationDelete = (publicationIdToDelete: number) => {
    if (!publicationIdToDelete) return

    setLoadedPublications((previousPublicationsList) =>
      previousPublicationsList?.filter(
        (publication) => publication?.id !== publicationIdToDelete
      )
    )
  }

  useEffect(() => {
    setLoadedPublications([...publications])
  }, [publications])

  if (!publications?.length && !loading) {
    return null
  }

  return (
    <FlatList
      data={loadedPublications}
      renderItem={({ item }: { item: Tweet }) => (
        <PublicationCard
          publication={item}
          onDelete={handlePublicationDelete}
        />
      )}
      onRefresh={handleFeedRefresh}
      refreshing={isRefreshing}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default PublicationsList
