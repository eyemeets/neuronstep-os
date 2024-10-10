import React from 'react'
import { HelperText as PaperHelperText } from 'react-native-paper'
import { View } from 'react-native'

interface CustomHelperTextProps {
  value?: string // To display a string error message
  type?: 'error' | 'info' // Type of HelperText ('error' or 'info')
  visible?: boolean // Whether to show the HelperText
  children?: React.ReactNode // Optional children for wrapping other content
}

const CustomHelperText: React.FC<CustomHelperTextProps> = ({ value, type = 'error', visible, children }) => {
  // Just return the helper text wrapped in a View to keep it aligned in the layout
  return (
    <View>
      <PaperHelperText type={type} visible={visible}>
        {value ? value : children}
      </PaperHelperText>
    </View>
  )
}

export default CustomHelperText
