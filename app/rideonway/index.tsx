import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

const RideOnWayScreen = () => {

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require("../../assets/fonts/Poppins-Regular.ttf")
  });

  const router = useRouter()

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.card}>
      <Image 
        source={{ uri: 'https://your-image-url.com' }} 
        style={styles.image}
      />
      <Text style={styles.title}>Title of the Card</Text>
      <Text style={styles.description}>Description of the card goes here. It can be any text.</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('Button clicked!')}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RideOnWayScreen;
