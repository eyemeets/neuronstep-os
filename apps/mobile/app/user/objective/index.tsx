import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'
import Text from '@/components/atoms/Text'
import View from '@/components/atoms/View'
import PromptBox from '@/components/layouts/user/PromptBox'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexDirection: 'column',
    flexGrow: 1,
    gap: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  }
})

const ObjectivePage = () => {
  const theme = getPaperTheme()
  const [ text ] = useState('Learn something new')

  return (
    <View style={[ styles.container, { backgroundColor: theme.colors.background } ]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          extraScrollHeight={20}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <Text textType="smallTitle" value={text} />
          <PromptBox />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ObjectivePage
