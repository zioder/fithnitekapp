import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';


const ConfirmPickupScreen = () => {
  const router = useRouter();
  const [region, setRegion] = useState({
    latitude: 30.7333,
    longitude: 76.7794,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // Fetch actual pickup location and route data
    // Update the region and marker accordingly
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity 
      style={styles.backButton} 
      onPress={() => {router.push('/')}}>
      <Image 
        source={require("@/assets/images/backbtn.png")}
        style={{ width: 40, height: 40 }}
      />
    </TouchableOpacity>
    <View style={{ 
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', // Add this to center horizontally
      marginLeft: -30, // Offset the backButton width to achieve true center
    }}>
      <Image 
        source={require("@/assets/images/logo.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain'
        }}
      />
    </View>
  
      </View>
      <Text style={styles.headerTitle}>Confirm Pickup Location</Text>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm Location</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    paddingHorizontal: 30,

    fontSize: 25,
    fontWeight: '200',
  },
  map: {
    flex: 1,
  },
  pickupLocation: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  pickupText: {
    fontSize: 16,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#FF5630",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: "center",
    fontFamily:"Poppins"

  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily:"Poppins"

  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default ConfirmPickupScreen;