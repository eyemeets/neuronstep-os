import React, { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyboardAvoidingView, Platform, ScrollView, Animated, Easing, StyleSheet } from 'react-native'
import type { AuthStackParamList } from '@/types/auth'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import View from '@/components/atoms/View'
import Button from '@/components/atoms/Button'
import TextInput from '@/components/atoms/TextInput'
import Dialog from '@/components/atoms/Dialog'
import Text from '@/components/atoms/Text'
import { auth, db } from '@/fb.config'
import type { User } from 'firebase/auth'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicator from '@/components/atoms/ActivityIndicator'
import type { FirebaseError } from 'firebase/app'

// Define external styles for the component
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  header: {
    marginBottom: 25
  },
  scrollContainer: {
    flexGrow: 1
  }
})

// Define validation schema using yup
const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

const Register = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState<string | null>(null)
  const [ dialogVisible, setDialogVisible ] = useState(false)

  const navigation = useTypedNavigation<AuthStackParamList>()

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema) // Use yup schema with react-hook-form
  })

  const buttonScale = useRef(new Animated.Value(1)).current // Animation value for button scaling

  useEffect(() => {
    if (loading) {
      // When loading starts, scale down the button
      Animated.timing(buttonScale, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
    else {
      // When loading ends, scale the button back up
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
  }, [ loading, buttonScale ])

  // Function to save user session to AsyncStorage
  const saveUserSession = async (user: User) => {
    try {
      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      )
      console.log('User session saved to AsyncStorage')
    }
    catch (error) {
      console.log('Error saving user session:', error)
    }
  }

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    setLoading(true)
    setError(null)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user

      // Update user profile in Firebase
      await updateProfile(user, { displayName: data.name })

      // Save additional user info to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: data.name
      })

      // Save user session to AsyncStorage
      await saveUserSession(user)

      console.log('User registered and info saved to Firestore')
      navigation.navigate('user', { screen: 'objective' })
    }
    catch (e) {
      const error = e as FirebaseError
      let errorMessage = 'An unknown error occurred'

      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use. Please try another.'
            break
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.'
            break
          default:
            errorMessage = error.message || errorMessage // Use Firebase error message
            break
        }
      }

      setError(errorMessage) // Set error state
      setDialogVisible(true) // Show dialog
    }
    finally {
      setLoading(false)
    }
  }

  const hideDialog = () => setDialogVisible(false) // Hide dialog handler

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center px-5 relative space-y-5">
        <ActivityIndicator animating={true} size="large" className="absolute inset-0" />
      </View>
    )
  }
  else {
    return (
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Handle keyboard avoiding behavior
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View className="flex flex-1 justify-center px-5 relative space-y-5">
            {/* Custom Dialog for Error Handling */}
            <Dialog
              visible={dialogVisible}
              onDismiss={hideDialog}
              title="Registration Error"
              contentText={error || ''}
              confirmText="OK"
              onConfirm={hideDialog}
            />
            <View>
              <Text textType="h1" style={styles.header} value="Register" />
            </View>

            {/* Name Input */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                  className={errors.name?.message ? 'mb-0' : 'mb-5'}
                />
              )}
            />

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  errorMessage={errors.email?.message}
                  className={errors.email?.message ? 'mb-0' : 'mb-5'}
                />
              )}
            />

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                  className={errors.password?.message ? 'mb-0' : 'mb-5'}
                />
              )}
            />

            {/* Register Button with Morphing Animation */}
            <Animated.View style={{ transform: [ { scale: buttonScale } ] }}>
              <Button
                text="Register"
                mode="contained"
                onPress={handleSubmit(handleRegister)}
                disabled={loading}
              />
            </Animated.View>

            {/* Go to Login Button */}
            <Button text="Go to Login" onPress={() => navigation.navigate('login')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default Register
