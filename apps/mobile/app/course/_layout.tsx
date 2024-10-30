import React from 'react'
import { Stack } from 'expo-router'
import View from '@/components/atoms/View'
import Header from '@/components/layouts/user/Header'
import UserDrawer from '@/components/layouts/user/UserDrawer' // Import the drawer component

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
        <Stack.Screen name="overview" options={{ title: 'Overview' }} />
        <Stack.Screen name="chapters" options={{ title: 'Chapters' }} />
        <Stack.Screen name="page" options={{ title: 'Page' }} />
      </Stack>
    </View>
  )
}
