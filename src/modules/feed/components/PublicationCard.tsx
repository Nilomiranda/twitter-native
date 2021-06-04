import React, { useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Tweet } from '../../../interfaces/tweet'
import { Avatar, Card } from 'react-native-paper'
import Text from '../../common/components/Text'
import { UserContext } from '../../../contexts/CurrentUser'
import styled from 'styled-components/native'
import theme from '../../../config/theme'
import { useMutation } from 'react-query'
import { deletePublication } from '../../../services/publication'

const PublicationFooter = styled(Card.Actions)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
`

interface PublicationCardProps {
  publication: Tweet
  onDelete?: (publicationId: number) => void
}

const PublicationCard = ({
  publication,
  onDelete = () => null,
}: PublicationCardProps) => {
  const { user } = useContext(UserContext)
  const deletePublicationMutation = useMutation(
    (publicationId: number) => deletePublication(publicationId),
    {
      onMutate: () => {
        onDelete(publication?.id)
      },
    }
  )

  const handleDeleteTweet = async () => {
    try {
      await deletePublicationMutation?.mutateAsync(publication?.id)
    } catch (err) {
      console.error('Error deleting publication')
    }
  }

  return (
    <Card>
      <Card.Title
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{
              uri:
                publication?.user?.profile_picture_url ||
                'https://i.imgur.com/nxEmMOS.png',
            }}
          />
        )}
        title={publication?.user?.nickname}
        subtitle={publication?.created_at}
      />
      <Card.Content>
        <Text color="primaryDark">{publication?.text}</Text>
      </Card.Content>
      <PublicationFooter>
        {user?.id === publication?.user?.id ? (
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={theme?.colors?.error}
            onPress={handleDeleteTweet}
          />
        ) : null}
      </PublicationFooter>
    </Card>
  )
}

export default PublicationCard
