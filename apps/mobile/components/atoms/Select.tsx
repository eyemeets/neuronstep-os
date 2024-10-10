import React, { forwardRef, useState } from 'react'
import { Button, Menu } from 'react-native-paper'
import { getPaperTheme } from '@/hooks/useThemeColor'
import HelperText from './HelperText'
import { StyleSheet } from 'react-native'

interface CustomSelectProps {
  label?: string
  options: { label: string; value: string }[] // Array of options with label and value
  errorMessage?: string
  style?: object
  onSelect: (value: string) => void // Function to handle selection
  selectedValue?: string
  customOutlineStyle?: object // Custom outline styles, such as borderRadius
  defaultOption?: string // Friendly placeholder option
  required?: boolean // Indicates if the field is mandatory
}

const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: 'flex-start' // Move justifyContent here
  },
  selectButton: {
    borderWidth: 1, // Ensures the border matches the TextInput style
    height: 50, // Match the height of the TextInput (adjust if needed)
    justifyContent: 'center', // Center the text vertically
    paddingVertical: 0, // Remove extra padding
    width: '100%'
  }
})

const CustomSelect = forwardRef<React.ElementRef<typeof Button>, CustomSelectProps>(
  ({
    label,
    options,
    onSelect,
    errorMessage,
    selectedValue,
    style,
    customOutlineStyle,
    defaultOption = 'Select an option',
    required = false,
    ...rest
  }, ref) => {
    const [ menuVisible, setMenuVisible ] = useState(false)
    const [ selectedLabel, setSelectedLabel ] = useState<string | undefined>(undefined) // Track label for display
    const paperTheme = getPaperTheme()
    const colors = paperTheme.colors

    const openMenu = () => setMenuVisible(true)
    const closeMenu = () => setMenuVisible(false)

    const isFocused = menuVisible

    const theme = {
      ...paperTheme,
      colors: {
        background: colors.primaryContainer,
        text: colors.onPrimaryContainer, // Focused text color
        placeholder: colors.onPrimaryContainer, // Unfocused placeholder color
        primary: colors.primary,
        outline: 'transparent' // Consistent with the TextInput
      }
    }

    const outlineStyle = {
      borderRadius: 10,
      ...customOutlineStyle // Allow custom styles to overwrite
    }

    const showError = required && !selectedValue

    return (
      <>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode="outlined"
              onPress={openMenu}
              style={[
                styles.selectButton,
                style,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: isFocused ? theme.colors.primary : theme.colors.outline, // Highlight border only on focus
                  borderRadius: outlineStyle.borderRadius // Use custom borderRadius
                }
              ]}
              contentStyle={styles.contentStyle} // Use the defined content style here
              labelStyle={{
                color: selectedLabel || isFocused ? theme.colors.text : theme.colors.placeholder, // Change text color based on focus
                ...theme.fonts.bodyLarge // Use bodyLarge to match the TextInput font style
              }}
            >
              {selectedLabel || defaultOption}
            </Button>
          }
        >
          {options.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => {
                setSelectedLabel(option.label) // Update the label for display
                onSelect(option.value) // Pass the value for data handling
                closeMenu()
              }}
              title={option.label}
            />
          ))}
        </Menu>
        {showError && (
          <HelperText value={errorMessage || `Please select a ${label?.toLowerCase()}`} type="error" visible={!!showError} />
        )}
      </>
    )
  }
)

CustomSelect.displayName = 'CustomSelect'

export default CustomSelect
