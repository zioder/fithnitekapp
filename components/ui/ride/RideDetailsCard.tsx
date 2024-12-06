import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RideDetailsProps {
  duration: string;
  eta: string;
  carModel: string;
  referenceNumber: string;
  driverName: string;
  rating: number;
  trips: number;
  onCall: () => void;
  onMessage: () => void;
  onCancel: () => void;
}

export default function RideDetailsCard({
  duration,
  eta,
  carModel,
  referenceNumber,
  driverName,
  rating,
  trips,
  onCall,
  onMessage,
  onCancel,
}: RideDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.eta}>{eta}</Text>
        </View>
        <View style={styles.carInfo}>
          <Text style={styles.carModel}>{carModel}</Text>
          <Text style={styles.reference}>{referenceNumber}</Text>
        </View>
      </View>

      <View style={styles.driverSection}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" size={40} color="#666" />
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driverName}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.trips}>({trips} trips)</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.communicationButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={onCall}>
            <Icon name="phone" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onMessage}>
            <Icon name="message" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width:"100%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  duration: {
    fontSize: 16,
    fontWeight: '600',
  },
  eta: {
    fontSize: 14,
    color: '#666',
  },
  carInfo: {
    alignItems: 'flex-end',
  },
  carModel: {
    fontSize: 16,
    fontWeight: '600',
  },
  reference: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  trips: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  communicationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});