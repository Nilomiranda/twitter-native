import React from 'react'
import { Snackbar as PaperSnackbar } from 'react-native-paper'
import theme from '../../../config/theme'

export type SnackBarType = 'message' | 'success' | 'warning' | 'error'

interface SnackbarProps {
  visible: boolean
  message: string
  onDismissSnackBar: () => void
  onPress?: () => void
  label?: string
  duration?: number
  type?: SnackBarType
}

const snackBarKindToBgColor: Record<SnackBarType, string> = {
  message: theme?.colors?.dark,
  success: theme?.colors?.primary,
  warning: theme?.colors?.warning,
  error: theme?.colors?.error,
}

const Snackbar = ({
  visible,
  onDismissSnackBar,
  message,
  onPress = () => null,
  label = 'Ok',
  duration = 5000,
  type = 'message',
}: SnackbarProps) => {
  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label,
        onPress: () => onPress(),
      }}
      duration={duration}
      style={{ backgroundColor: snackBarKindToBgColor[type] }}
    >
      {message}
    </PaperSnackbar>
  )
}

export default Snackbar
