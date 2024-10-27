import React, { useEffect, useState } from 'react'
import { StatusBar, View as RNView, StyleSheet } from 'react-native'
import { Slot, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { BlurView } from 'expo-blur'
import View from '@/components/atoms/View'
import Text from '@/components/atoms/Text'
import { getPaperTheme } from '@/hooks/useThemeColor'
import { useAuthStore, listenToAuthChanges } from '@/stores'
import { useLoadFonts } from '@/css/fonts'
import { useTypedNavigation } from '@/hooks/useTypedNav'
import type { AuthStackParamList } from '@/types/auth'
import GlobalDialogBox from '@/components/global/GlobalDialogbox'
import ObjectiveInvalidPanel from '@/components/global/ObjectiveInvalidPanel'

const styles = StyleSheet.create({
  blurView: {
    height: 50,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  slotContainer: {
    flex: 1,
    zIndex: 0
  }
})

const RootLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.user !== null)
  const loading = useAuthStore((state) => state.loading)
  const router = useRouter()
  const [ fontsLoaded, setFontsLoaded ] = useState(false)
  const [ fontsLoadError, setFontsLoadError ] = useState(false)
  const navigation = useTypedNavigation<AuthStackParamList>()

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await useLoadFonts()
        setFontsLoaded(true)
      }
      catch (error) {
        console.error('Error loading fonts:', error)
        setFontsLoadError(true)
      }
    }

    const fontTimeout = setTimeout(() => {
      if (!fontsLoaded) {
        setFontsLoadError(true)
      }
    }, 10000)

    loadFonts()

    return () => clearTimeout(fontTimeout)
  }, [])

  useEffect(() => {
    const unsubscribe = listenToAuthChanges()

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!loading && fontsLoaded) {
      if (isAuthenticated) {
        navigation.navigate('user', { screen: 'objective' })
      }
      else {
        router.replace('/auth/login')
      }
    }
  }, [ loading, isAuthenticated, fontsLoaded, router ])

  const theme = getPaperTheme()

  if (!fontsLoaded || loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        {fontsLoadError && <Text value="Failed to load fonts, continuing without custom fonts." />}
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <BlurView intensity={50} style={styles.blurView} />
        <RNView style={styles.slotContainer}>
          <Slot />
        </RNView>
        <GlobalDialogBox />
        <ObjectiveInvalidPanel />
      </View>
    </PaperProvider>
  )
}

export default RootLayout

/*import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PageTemplate = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Title</Text>
      <Text style={styles.content}>This is a minimal page template.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});

export default PageTemplate;
*/
