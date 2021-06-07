import React from 'react'
import { FlatList } from 'react-native'
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
      renderItem={({ item }: { item: User }) => <UserCard user={item} />}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default UsersList
