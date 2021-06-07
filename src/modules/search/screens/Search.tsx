import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Searchbar as PaperSearchbar } from 'react-native-paper'
import { useQuery } from 'react-query'
import { User } from '../../../interfaces/user'
import UsersList from '../components/UsersList'
import theme from '../../../config/theme'

const MainContainer = styled.View`
  flex: 1;
`

const ListContainer = styled.View`
  padding: 16px;
  background: ${() => theme?.colors?.accent};
  flex: 1;
`

const Searchbar = styled(PaperSearchbar)`
  box-shadow: none;
`

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, refetch } = useQuery<{ users: User[] }>(
    ['users', { query: searchQuery }],
    { enabled: false }
  )

  useEffect(() => {
    if (searchQuery) {
      refetch()
    }
  }, [searchQuery])

  useEffect(() => {
    console.log('data', data)
  }, [data])

  return (
    <MainContainer>
      <Searchbar
        placeholder="Search for a user"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        autoCapitalize="none"
      />
      <ListContainer>
        <UsersList users={data?.users || []} />
      </ListContainer>
    </MainContainer>
  )
}

export default Search
