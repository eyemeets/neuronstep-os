import React, { useRef, useState, useEffect } from 'react'
import type { TextInput as RNTextInput } from 'react-native'
import { Animated, Easing, Keyboard } from 'react-native'
import { IconButton } from 'react-native-paper'
import View from '../../../atoms/View'
import TextInput from '../../../atoms/TextInput'
import { getPaperTheme } from '@/hooks/useThemeColor'
import Select from '../../../atoms/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import HelperText from '../../../atoms/HelperText'
import ActivityIndicator from '../../../atoms/ActivityIndicator'
import type { UserObjectiveParamsSchema } from '@repo/shared-types'
import { nanoid } from 'nanoid/non-secure'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { data, promptSchema } from './data'
import { initStyle } from './styles'

const PromptBox = () => {
  const useMockupData = true
  
  const navigation = useTypedNavigation()
  const [ isFocused, setIsFocused ] = useState(false)
  const [ isSettingsVisible, setIsSettingsVisible ] = useState(false)
  const theme = getPaperTheme()
  const colors = theme.colors
  const textInputRef = useRef<RNTextInput>(null)
  const animatedHeight = useRef(new Animated.Value(0)).current
  const [ requestValidating, setRequestValidating ] = useState(false)
  const styles = initStyle()

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(promptSchema)
  })

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isSettingsVisible ? 600 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false
    }).start()
  }, [ isSettingsVisible ])

  const handleValidate = async (data: UserObjectiveParamsSchema) => {
    const uniqueId = nanoid()

    setRequestValidating(true)

    const objectiveMockupData: UserObjectiveParamsSchema = {
      objective_id: uniqueId,
      objective: 'I want to learn about the history of Europe',
      language: 'en-US',
      education_level: 'undergraduate',
      learning_style: 'visual',
      tone: 'academic',
      curriculum: 'General'
    }

    const formattedData: UserObjectiveParamsSchema = {
      objective_id: uniqueId,
      objective: data.objective,
      language: data.language || 'en-US',
      education_level: data.education_level || 'undergraduate',
      learning_style: data.learning_style || 'visual',
      tone: data.tone || 'academic',
      curriculum: data.curriculum || 'General'
    }

    try {
      navigation.navigate('user', {
        screen: 'build-course',
        params: { 
          form: useMockupData ?
            objectiveMockupData : 
            formattedData
        }
      })

      setRequestValidating(false)
    }
    catch (error) {
      setRequestValidating(false)
      console.error('Error while calling validateObjective:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textAreaContainer}>
        <IconButton
          icon="magnify"
          style={styles.searchIcon}
          size={20}
          iconColor={isFocused ? colors.accent : colors.onPrimaryContainer}
          onPress={() => textInputRef.current?.focus()}
        />
        <IconButton
          icon="cog"
          style={styles.settingsButton}
          size={20}
          iconColor={colors.accent}
          onPress={() => setIsSettingsVisible(!isSettingsVisible)}
        />
        <Controller
          control={control}
          name="objective"
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={textInputRef}
              style={[ styles.textArea, { backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer } ]}
              outlineStyle={styles.outlineStyle}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={onChange}
              multiline={true}
              placeholder={data.objective.placeholder}
              errorMessage={errors.objective?.message}
            />
          )}
        />
        <View>
          {requestValidating ? (
            <ActivityIndicator
              size={20}
              style={styles.activityIndicator}
            />
          ) : (
            <IconButton
              icon="arrow-right"
              style={styles.submitButton}
              size={20}
              iconColor={colors.accent}
              onPress={handleSubmit(async (data) => {
                setRequestValidating(true)
                Keyboard.dismiss() // Close the keyboard when submitting
                await handleValidate(data)
              })}
            />
          )}
        </View>
      </View>
      <Animated.View style={[ styles.collapsibleContainer, { height: animatedHeight } ]}>
        <View style={styles.explanation}>
          <HelperText type="info" value={data.explanation.helperText} />
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, value } }) => (
              <Select
                options={data.language.options}
                onSelect={onChange}
                selectedValue={value}
                defaultOption={data.language.placeholder}
              />
            )}
          />
          <HelperText type="info" value={data.language.helperText} />
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="education_level"
            render={({ field: { onChange, value } }) => (
              <Select
                options={data.education.options}
                onSelect={onChange}
                selectedValue={value}
                defaultOption={data.education.placeholder}
              />
            )}
          />
          <HelperText type="info" value={data.education.helperText} />
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="learning_style"
            render={({ field: { onChange, value } }) => (
              <Select
                options={data.learningStyle.options}
                onSelect={onChange}
                selectedValue={value}
                defaultOption={data.learningStyle.placeholder}
              />
            )}
          />
          <HelperText type="info" value={data.learningStyle.helperText} />
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="curriculum"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={data.curriculum.label}
                value={value}
                onChangeText={onChange}
                mode="outlined"
                placeholder={data.curriculum.placeholder}
              />
            )}
          />
          <HelperText type="info" value={data.curriculum.helperText} />
          {errors.curriculum && <HelperText type="error">{errors.curriculum.message}</HelperText>}
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="tone"
            render={({ field: { onChange, value } }) => (
              <Select
                options={data.tone.options}
                onSelect={onChange}
                selectedValue={value}
                defaultOption={data.tone.placeholder}
              />
            )}
          />
          <HelperText type="info" value={data.tone.helperText} />
        </View>
      </Animated.View>
    </View>
  )
}

export default PromptBox
