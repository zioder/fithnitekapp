import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf")
  });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      console.log(user);
      console.log(user!!);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!loggedIn ? (
          // Auth screens
          <>
            <Stack.Screen 
              name="index" 
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Main app screens with tab bar
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }}
          />
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}