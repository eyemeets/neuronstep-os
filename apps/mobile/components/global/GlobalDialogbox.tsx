import React from 'react'
import { useUiStore } from '@/stores/user-ui'
import Button from '../atoms/Button'
import CustomDialog from '../atoms/Dialog'
import { Paragraph } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const GlobalDialogBox: React.FC = () => {
  const { dialogVisible, dialogTitle, dialogDescription, dialogStatus, hideDialog } = useUiStore()

  // Define different text color styles based on dialogStatus
  const getDialogTextStyle = () => {
    switch (dialogStatus) {
      case 'success':
        return { color: 'green' }
      case 'warning':
        return { color: 'orange' }
      case 'error':
        return { color: 'red' }
      case 'info':
      default:
        return { color: 'blue' }
    }
  }

  return (
    <CustomDialog
      visible={dialogVisible}
      onDismiss={hideDialog}
      title={dialogTitle}
      contentText={dialogDescription}
      confirmText="Ok"
      onConfirm={hideDialog}
      className="global-dialog"
      // You can pass additional styles if needed
    />
  )
}

export default GlobalDialogBox
