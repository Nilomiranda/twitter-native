import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Tweet } from '../../../interfaces/tweet'
import PublicationsList from '../components/PublicationsList'
import { FAB } from 'react-native-paper'
import styled from 'styled-components/native'
import theme from '../../../config/theme'
import NewPublicationModal from '../components/NewPublicationModal'

const FabButton = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
  background: ${() => theme?.colors?.primary};
`

const Feed = () => {
  const [isNewPublicationModalVisible, setIsNewPublicationModalVisible] =
    useState(false)

  const [page, setPage] = useState(1)
  const { data } = useQuery<{ feed: Tweet[] }>([
    'feed',
    {
      page,
    },
  ])
  const [loadedPublications, setLoadedPublications] = useState<Tweet[]>([])

  const handleLoadMore = async () => {
    setPage((currentPage) => currentPage + 1)
  }

  const handleNewPublication = (publication: Tweet) => {
    setLoadedPublications((previousPublicationsList) =>
      [publication].concat(previousPublicationsList)
    )
  }

  useEffect(() => {
    if (page === 1) {
      setLoadedPublications(data?.feed || [])
      return
    }

    if (page > 1) {
      setLoadedPublications((previouslyLoadedPublications) =>
        previouslyLoadedPublications.concat(data?.feed || [])
      )
      return
    }
  }, [data?.feed])

  return (
    <>
      <PublicationsList
        publications={loadedPublications}
        onLoadMore={handleLoadMore}
      />
      <FabButton
        icon="grease-pencil"
        onPress={() => setIsNewPublicationModalVisible(true)}
      />

      <NewPublicationModal
        isVisible={isNewPublicationModalVisible}
        onClose={() => setIsNewPublicationModalVisible(false)}
        onNewPublication={handleNewPublication}
      />
    </>
  )
}

export default Feed
