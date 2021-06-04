import React, { useEffect } from 'react'
import Text from '../../common/components/Text'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Feed = () => {
  useEffect(() => {
    AsyncStorage.clear()
  }, [])

  return <Text>Feed</Text>
}

export default Feed
