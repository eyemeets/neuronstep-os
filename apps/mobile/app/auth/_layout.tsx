import View from '@/components/atoms/View'
import { Stack } from 'expo-router'
import React from 'react'
import { getPaperTheme } from '@/hooks/useThemeColor'

export default function AuthLayout() {
  const theme = getPaperTheme()

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>

      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background, flex: 1 }
        }}
      >
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
      </Stack>

    </View>
  )
}
