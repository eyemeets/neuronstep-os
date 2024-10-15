import React from 'react'
import { Stack } from 'expo-router'
import View from '@/components/atoms/View'
import Header from '@/components/user/Header'
import UserDrawer from '@/components/user/UserDrawer'

export default function UserLayout() {
  return (
    <View className="flex-1">
      <Header
        title="NeuronStep"
        onMenuPress={() => console.log('Menu button pressed')}
        onProfilePress={() => console.log('Profile button pressed')}
      />
      <UserDrawer />
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false
        }}
      >
        <Stack.Screen name="objective" options={{ title: 'Objective' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="courses" options={{ title: 'Courses' }} />
        <Stack.Screen name="build-course" options={{ title: 'Build course' }} />
      </Stack>
    </View>
  )
}
