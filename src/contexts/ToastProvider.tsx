import React, { createContext, useState } from 'react'
import Snackbar, { SnackBarType } from '../modules/common/components/Snackbar'

export interface ToastConfig {
  message: string
  kind?: SnackBarType
  // duration in milliseconds
  duration?: number
}

interface ToastData {
  visible: boolean
  message: string
  duration?: number
  kind?: SnackBarType
}

export const ToastContext = createContext({
  show: (toastConfig: ToastConfig) => toastConfig,
})

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData>({
    visible: false,
    message: '',
  })

  const show = (config: ToastConfig) => {
    setToastData({
      visible: true,
      message: config?.message || '',
      duration: config?.duration || 5000,
      kind: config?.kind || 'message',
    })
    return config
  }

  const handleSnackBarDismissed = () => {
    setToastData({
      visible: false,
      message: '',
      duration: 5000,
    })
  }

  return (
    <ToastContext.Provider value={{ show }}>
      <>
        {children}
        <Snackbar
          visible={toastData?.visible}
          message={toastData?.message}
          onDismissSnackBar={handleSnackBarDismissed}
          duration={toastData?.duration}
          type={toastData?.kind}
        />
      </>
    </ToastContext.Provider>
  )
}

export default ToastProvider
