import React from 'react'
import { FlatList, View } from 'react-native'
import { User } from '../../../interfaces/user'
import UserCard from './UserCard'

interface UsersListProps {
  users: User[]
  loading?: boolean
  onLoadMore?: () => void
}

const UsersList = ({
  users = [],
  loading = false,
  onLoadMore = () => null,
}: UsersListProps) => {
  if (!users?.length && !loading) {
    return null
  }

  return (
    <FlatList
      data={users}
      renderItem={({ item }: { item: User }) => (
        <View style={{ marginBottom: 16 }}>
          <UserCard user={item} />
        </View>
      )}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default UsersList
