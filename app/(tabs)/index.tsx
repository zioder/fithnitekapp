import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
      <View style={[styles.container, colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
        {/* Logo and Title */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={{ width: 400, height: 200 }} 
          />
        </View>
  
        {/* Subtitle */}
        <Text style={[styles.subtitle, colorScheme === 'dark' ? styles.darkText : styles.lightText]}>
          Your Ride, Your Choice
        </Text>
  
        {/* Buttons */}
        <View>
            <TouchableOpacity 
            style={styles.signUpButton} 
            onPress={() => router.push('/explore')}  // Updated path
            >
            <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
  
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <Text style={styles.logInText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  redText: {
    color: '#FF5630', // Match the red color of the car
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  signUpButton: {
    backgroundColor: '#FF5630', // Match the red button
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 25,
    marginBottom: 15,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logInText: {
    color: '#007BFF', // Blue for "Log in"
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;