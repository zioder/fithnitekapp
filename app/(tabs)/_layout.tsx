import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show loading state
  if (loading) {
    return null;
  }

  // Redirect to index if not authenticated


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="myRides"
        options={{
          title: 'My Rides',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="FindRide"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="PublishAride"
        options={{
          title: 'Publish',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="message" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}