import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { AuthStackParamList } from '@/types/auth'
import TextInput from '@/components/atoms/TextInput'
import View from '@/components/atoms/View'
import Button from '@/components/atoms/Button'
import Dialog from '@/components/atoms/Dialog'
import Text from '@/components/atoms/Text'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import { auth } from '@/fb.config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '@/stores/auth'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'

// Define external styles for the component
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1
  },
  header: {
    flexShrink: 0,
    marginBottom: 25
  }
})
// Define validation schema using yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useTypedNavigation<AuthStackParamList>()
  const setUser = useAuthStore((state) => state.setUser)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true)
    setError(null)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user

      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      })

      navigation.navigate('user', { screen: 'objective' })
    }
    catch (error: any) {
      let errorMessage = 'An unknown error occurred'

      if (error.code) {
        switch (error.code) {
          case 'auth/operation-not-allowed':
            errorMessage = 'Login with this method is not allowed. Please contact support.'
            break
          case 'auth/user-not-found':
            errorMessage = 'No user found with this email. Please sign up first.'
            break
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.'
            break
          default:
            errorMessage = error.message || errorMessage
            break
        }
      }

      setError(errorMessage)
      setDialogVisible(true)
    }
    finally {
      setLoading(false)
    }
  }

  const hideDialog = () => setDialogVisible(false)

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View className="flex flex-1 justify-center space-y-5 px-5 relative">
          <View>
            <Text textType="h1" value="Login" style={styles.header} />
          </View>

          <Dialog
            visible={dialogVisible}
            onDismiss={hideDialog}
            title="Login Error"
            contentText={error || ''}
            confirmText="OK"
            onConfirm={hideDialog}
          />

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
              />
            )}
          />

          <Button
            text={loading ? 'Logging in...' : 'Login'}
            mode="contained"
            onPress={handleSubmit(handleLogin)}
            disabled={loading}
          />

          <Button
            onPress={() => navigation.navigate('register')}
            text="Go to Register"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
