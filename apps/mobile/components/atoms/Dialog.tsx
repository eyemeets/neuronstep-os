import React from 'react'
import { View, StyleSheet } from 'react-native'
import type { DialogProps } from 'react-native-paper'
import { Dialog, Portal, Text, Button as PaperButton } from 'react-native-paper'
import { styled } from 'nativewind'
import { getPaperTheme } from '@/hooks/useThemeColor'

// Create styled components for Dialog and Button
const StyledDialog = styled(Dialog)
const StyledButton = styled(PaperButton)

// Define a custom Dialog component that supports dynamic title, content, and actions, similar to your Button
interface CustomDialogProps extends Omit<DialogProps, 'children'> {
  className?: string
  title?: string
  contentText?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  className,
  title = 'Alert',
  contentText,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  visible,
  onDismiss,
  ...rest
}) => {
  const theme = getPaperTheme()
  const colors = theme.colors

  const dialogTheme = {
    colors: {
      surface: colors.surface || '#ffffff', // Default surface color
      text: colors.onSurface || '#000000' // Default text color
    }
  }

  // Define styles right above where they are used
  const dialogStyles = StyleSheet.create({
    dialogStyle: {
      backgroundColor: dialogTheme.colors.surface,
      padding: 20 // Padding moved to StyleSheet
    },
    textStyle: {
      color: dialogTheme.colors.text
    }
  })

  return (
    <Portal>
      <StyledDialog
        className={className}
        visible={visible}
        onDismiss={onDismiss}
        style={dialogStyles.dialogStyle}
        theme={dialogTheme}
        {...rest}
      >
        {title && <Dialog.Title>{title}</Dialog.Title>}
        <Dialog.Content>
          <Text style={dialogStyles.textStyle}>
            {contentText}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          {cancelText && (
            <StyledButton onPress={onCancel}>{cancelText}</StyledButton>
          )}
          {confirmText && (
            <StyledButton onPress={onConfirm}>{confirmText}</StyledButton>
          )}
        </Dialog.Actions>
      </StyledDialog>
    </Portal>
  )
}

export default CustomDialog
