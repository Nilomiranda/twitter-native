import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Tweet } from '../../../interfaces/tweet'
import PublicationsList from '../components/PublicationsList'

const Feed = () => {
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
    <PublicationsList
      publications={loadedPublications}
      onLoadMore={handleLoadMore}
    />
  )
}

export default Feed
