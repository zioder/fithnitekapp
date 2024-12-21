import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack  } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect , useState } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from "@/context";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "@/lib/firebaseConfig"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf")
  });

  const [user, setUser] = useState<any>(null)

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      // console.log(user)
      setUser(user)
    })
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown : false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="profile/index" options={{ headerShown: false }} /> 
        <Stack.Screen name="signup/index" options={{ headerShown: false }} />
        <Stack.Screen name="rideonway/index" options={{ headerShown: false }} />
        <Stack.Screen name="trackride/index" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />    
      </Stack>
      <StatusBar style="auto"/>
    </ThemeProvider>
    </SessionProvider>

  );
}
