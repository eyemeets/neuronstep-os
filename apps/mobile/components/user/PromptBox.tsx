import React, { useRef, useState, useEffect } from 'react'
import type { TextInput as RNTextInput } from 'react-native'
import { StyleSheet, Animated, Easing, Keyboard } from 'react-native'
import { IconButton } from 'react-native-paper'
import View from '../atoms/View'
import TextInput from '../atoms/TextInput'
import { getPaperTheme } from '@/hooks/useThemeColor'
import Select from '../atoms/Select'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import HelperText from '../atoms/HelperText'
import ActivityIndicator from '../atoms/ActivityIndicator'
import { useCurriculumStore } from '@/stores/curriculum'
import { useUiStore } from '@/stores/user-ui'
import type { UserLearningPreferences, UserObjectiveParamsSchema, UserTonePreferences } from '@repo/shared-types'
import { EducationLevelEnum } from '@repo/shared-enums'
import { nanoid } from 'nanoid/non-secure'
import { createCourseObjective } from '@/services/course/create-objective'
import { useTypedNavigation } from '@/hooks/useTypedNav'

const styles = StyleSheet.create({
  activityIndicator: {
    bottom: 20,
    position: 'absolute',
    right: 20,
    zIndex: 1
  },
  collapsibleContainer: {
    marginBottom: 200,
    marginTop: 25
  },
  container: {
    flex: 1
  },
  explanation: {
    paddingBottom: 25
  },
  inputGroup: {
    marginBottom: 15
  },
  searchIcon: {
    backgroundColor: 'transparent',
    left: 5,
    position: 'absolute',
    top: 5,
    zIndex: 1
  },
  settingsButton: {
    bottom: 5,
    left: 5,
    position: 'absolute',
    zIndex: 1
  },
  submitButton: {
    bottom: 5,
    position: 'absolute',
    right: 5,
    zIndex: 1
  },
  textArea: {
    borderColor: 'transparent',
    borderWidth: 1,
    minHeight: 150,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 2.5,
    textAlignVertical: 'top',
    width: '100%',
    zIndex: -1
  },
  textAreaContainer: {
    position: 'relative'
  }
})

// Define possible values for education level, learning style, and tone
const educationLevels: EducationLevelEnum[] = [
  EducationLevelEnum.PRESCHOOL,
  EducationLevelEnum.PRIMARY,
  EducationLevelEnum.SECONDARY,
  EducationLevelEnum.UNDERGRADUATE,
  EducationLevelEnum.GRADUATE,
  EducationLevelEnum.DOCTORATE,
  EducationLevelEnum.POSTDOCTORAL
]


const learningStyles: UserLearningPreferences[] = [
  'visual',
  'auditory',
  'kinesthetic',
  'readingWriting'
]

const tonePreferences: UserTonePreferences[] = [
  'fun',
  'serious',
  'academic',
  'motivational',
  'satirical',
  'friendly',
  'reflective',
  'inspirational'
]

// Define validation schema using yup
const promptSchema = yup.object().shape({
  curriculum: yup.string().optional(), // Optional field
  objective: yup
    .string()
    .min(10, 'Objective must be at least 10 characters')
    .required('Objective is required'), // Required field
  language: yup.string().optional(), // Optional field
  education_level: yup
    .string()
    .oneOf(educationLevels, 'Invalid education level') // Validate against allowed values
    .optional(), // Optional field
  learning_style: yup
    .string()
    .oneOf(learningStyles, 'Invalid learning style') // Validate against allowed values
    .optional(), // Optional field
  tone: yup
    .string()
    .oneOf(tonePreferences, 'Invalid tone preference') // Validate against allowed values
    .optional() // Optional field
})

const PromptBox = () => {
  const navigation = useTypedNavigation()
  const [ isFocused, setIsFocused ] = useState(false)
  const [ isSettingsVisible, setIsSettingsVisible ] = useState(false)
  const theme = getPaperTheme()
  const colors = theme.colors
  const textInputRef = useRef<RNTextInput>(null)
  const animatedHeight = useRef(new Animated.Value(0)).current
  const [ requestValidating, setRequestValidating ] = useState(false)

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

  // Define the options for the dropdowns
  const languageOptions = [
    { label: 'English (en-US)', value: 'en-US' },
    { label: 'Norwegian (nb-NO)', value: 'nb-NO' }
  ]

  const educationOptions = [
    { label: 'Preschool', value: 'preschool' },
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Undergraduate', value: 'undergraduate' },
    { label: 'Graduate', value: 'graduate' },
    { label: 'Doctorate', value: 'doctorate' },
    { label: 'Postdoctoral', value: 'postdoctoral' }
  ]

  const learningStyleOptions = [
    { label: 'Visual', value: 'visual' },
    { label: 'Auditory', value: 'auditory' },
    { label: 'Kinesthetic', value: 'kinesthetic' },
    { label: 'Reading/Writing', value: 'readingWriting' }
  ]

  const toneOptions = [
    { label: 'Fun', value: 'fun' },
    { label: 'Serious', value: 'serious' },
    { label: 'Academic', value: 'academic' },
    { label: 'Motivational', value: 'motivational' },
    { label: 'Satirical', value: 'satirical' },
    { label: 'Friendly', value: 'friendly' },
    { label: 'Reflective', value: 'reflective' },
    { label: 'Inspirational', value: 'inspirational' }
  ]

  const handleValidate = async (data: UserObjectiveParamsSchema) => {
    const uniqueId = nanoid()

    setRequestValidating(true)

    // Set default values for missing fields
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
        params: { form: formattedData }
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
          iconColor={isFocused ? colors.defaultIcon : colors.onPrimaryContainer}
          onPress={() => textInputRef.current?.focus()}
        />
        <IconButton
          icon="cog"
          style={styles.settingsButton}
          size={20}
          iconColor={colors.onPrimaryContainer}
          onPress={() => setIsSettingsVisible(!isSettingsVisible)}
        />
        <Controller
          control={control}
          name="objective"
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={textInputRef}
              style={[ styles.textArea, { backgroundColor: colors.primaryContainer, color: colors.onPrimaryContainer } ]}
              outlineStyle={{ borderRadius: 20 }}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={onChange}
              multiline={true}
              placeholder="I want to learn about..."
              errorMessage={errors.objective?.message}
            />
          )}
        />
        <View>
          {
            requestValidating ?
                <ActivityIndicator
                  size={20}
                  style={styles.activityIndicator}
                /> :
                <IconButton
                  icon="arrow-right"
                  style={styles.submitButton}
                  size={20}
                  iconColor={colors.onPrimaryContainer}
                  onPress={handleSubmit(async (data) => {
                    setRequestValidating(true)
                    Keyboard.dismiss() // Close the keyboard when submitting
                    await handleValidate(data)
                  })}
                />
          }
        </View>
      </View>
      <Animated.View style={[ styles.collapsibleContainer, { height: animatedHeight, overflow: 'hidden' } ]}>
        {/* Explanation Text */}
        <View style={styles.explanation}>
          <HelperText type="info" value="These fields are optional but will help tailor the course content to your needs, creating a more personalized and effective learning experience based on your background and preferences." />
        </View>

        {/* Language Select */}
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, value } }) => (
              <Select
                options={languageOptions}
                onSelect={onChange}
                selectedValue={value}
                defaultOption="Select a language"
              />
            )}
          />
          <HelperText type="info" value="e.g., English (en-US), Norwegian (nb-NO)" />

        </View>

        {/* Education Level Select */}
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="education_level"
            render={({ field: { onChange, value } }) => (
              <Select
                options={educationOptions}
                onSelect={onChange}
                selectedValue={value}
                defaultOption="Select Education Level"
              />
            )}
          />
          <HelperText type="info" value="Preschool, Primary, Secondary, Undergraduate, Graduate, Doctorate, Postdoctoral"/>

        </View>

        {/* Learning Style Select */}
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="learning_style"
            render={({ field: { onChange, value } }) => (
              <Select
                options={learningStyleOptions}
                onSelect={onChange}
                selectedValue={value}
                defaultOption="Select Learning Style"
              />
            )}
          />
          <HelperText type="info" value="Visual, Auditory, Kinesthetic, Reading/Writing"/>

        </View>

        {/* Curriculum Text Input */}
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="curriculum"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Curriculum"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                placeholder="Enter Curriculum"
              />
            )}
          />
          <HelperText type="info" value="Enter the name of your school or university to match the curriculum style"/>
          {errors.curriculum && <HelperText type="error">{errors.curriculum.message}</HelperText>}
        </View>

        {/* Tone Select */}
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="tone"
            render={({ field: { onChange, value } }) => (
              <Select
                options={toneOptions}
                onSelect={onChange}
                selectedValue={value}
                defaultOption="Select Tone"
              />
            )}
          />
          <HelperText type="info" value="Fun, Serious, Academic, Motivational, Satirical, Friendly, Reflective, Inspirational" />

        </View>
      </Animated.View>
    </View>
  )
}

export default PromptBox
