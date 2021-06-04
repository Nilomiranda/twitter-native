import { useContext } from 'react'
import { ToastContext } from '../contexts/ToastProvider'

const useToast = () => {
  const { show } = useContext(ToastContext)

  return {
    show,
  }
}

export default useToast
