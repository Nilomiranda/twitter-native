import React, { useState } from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import Input from '../../common/components/Input'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useMutation } from 'react-query'
import { createPublication } from '../../../services/publication'
import useToast from '../../../hooks/useToast'
import { translateErrors } from '../../../utils/translateErrors'
import { Tweet } from '../../../interfaces/tweet'
import { AxiosResponse } from 'axios'

const ModalWrapper = styled(Modal)`
  background: aliceblue;
  padding: 20px;
  justify-content: flex-start;
`

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`

const PublishButton = styled(Button)`
  align-self: flex-end;
  margin-top: 16px;
`

interface NewPublicationModalProps {
  isVisible: boolean
  onClose: () => void
  onNewPublication?: (newPublication: Tweet) => void
}

const NewPublicationModal = ({
  isVisible,
  onClose,
  onNewPublication = () => null,
}: NewPublicationModalProps) => {
  const toast = useToast()
  const newPublicationMutation = useMutation((content: string) =>
    createPublication(content)
  )
  const [publishing, setPublishing] = useState(false)
  const [content, setContent] = useState('')

  const handlePublishClick = async () => {
    try {
      setPublishing(true)
      const createdPublicationResponse: AxiosResponse<{ tweet: Tweet }> =
        await newPublicationMutation?.mutateAsync(content)
      if (createdPublicationResponse?.data?.tweet) {
        onNewPublication(createdPublicationResponse?.data?.tweet)
        onClose()
        setContent('')
        toast.show({
          message: 'Published 🥳',
          kind: 'success',
        })
      }
    } catch (err) {
      console.log('Error creating new publication', err)
      toast.show({
        message:
          translateErrors(err?.response?.data?.errors) ||
          'An unexpected error while trying to publish your content. Try again later',
        kind: 'error',
      })
    } finally {
      setPublishing(false)
    }
  }

  return (
    <Portal>
      <ModalWrapper
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <ModalHeader>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} />
          </TouchableOpacity>
        </ModalHeader>
        <Input
          multiline
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <PublishButton
          mode="contained"
          loading={publishing}
          disabled={publishing}
          onPress={handlePublishClick}
        >
          Publish
        </PublishButton>
      </ModalWrapper>
    </Portal>
  )
}

export default NewPublicationModal
