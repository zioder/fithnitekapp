import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons from Ionicons set

import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';


const profile = () => {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        >
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>
      {/* Add other UI components here */}
    </View> 

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Text style={styles.name}>Abdessayed Ala</Text>
        <Text style={styles.location}>📍 Sousse, Tunisie</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>122</Text>
          <Text style={styles.statLabel}>trips</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.2</Text>
          <Text style={styles.statLabel}>avg. rating</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Latest Trips */}
      <View style={styles.latestTripsContainer}>
        <Text style={styles.latestTripsTitle}>My Latest trips</Text>
        <View style={styles.trip}>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>Date & time:</Text> 25/12 at 4 AM
          </Text>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>From To:</Text> Sousse {'>'} Bizerte
          </Text>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>Description:</Text> No babies
          </Text>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>Average rating:</Text> 4.8
          </Text>
        </View>
        <View style={styles.trip}>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>Date & time:</Text> 20/12 at 6 AM
          </Text>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>From To:</Text> Souuse {'>'} Nabeul
          </Text>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>Description:</Text> Handheld bags only
          </Text>
          <Text style={styles.tripText}>
            <Text style={styles.bold}>Average rating:</Text> 4.8
          </Text>
        </View>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 10,
    margin: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: 'red',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  statLabel: {
    fontSize: 16,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  messageButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  viewDetailsButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  latestTripsContainer: {
    paddingHorizontal: 20,
  },
  latestTripsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trip: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  tripText: {
    fontSize: 16,
    marginVertical: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default profile;


