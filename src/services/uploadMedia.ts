import { AxiosResponse } from 'axios'
import { httpClient } from '../config/queryClient'

export const uploadMedia = async (
  file: Blob
): Promise<AxiosResponse<{ path: string }>> => {
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)
  return httpClient?.post('upload', uploadFormData)
}
