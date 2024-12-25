import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

export default function PublishRide() {
  const [from, setFrom] = useState("");
  const [fromCoords, setFromCoords] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [to, setTo] = useState("");
  const [toCoords, setToCoords] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [radius, setRadius] = useState(5);
  const [seats, setSeats] = useState(1);
  const [description, setDescription] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Publish Ride</Text>

        <View style={styles.autocompleteContainer}>
          <Text style={styles.label}>Origin:</Text>
          <GooglePlacesAutocomplete
            placeholder="Enter starting point"
            onPress={(data, details = null) => {
              const location = details?.geometry.location;
              if (location) {
                setFrom(data.description);
                setFromCoords({ latitude: location.lat, longitude: location.lng });
              }
            }}
            query={{ key: "AIzaSyB3Z_jPfdW98gdvUn25nOOBinXKvOYDhqU", language: "en" }}
            fetchDetails
            styles={{
              container: { flex: 0 },
              textInput: styles.input,
              listView: styles.autocompleteList,
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
            enablePoweredByContainer={false}
            minLength={2}
          />
        </View>

        <View style={styles.autocompleteContainer}>
          <Text style={styles.label}>Destination:</Text>
          <GooglePlacesAutocomplete
            placeholder="Enter destination"
            onPress={(data, details = null) => {
              const location = details?.geometry.location;
              if (location) {
                setTo(data.description);
                setToCoords({ latitude: location.lat, longitude: location.lng });
              }
            }}
            query={{ key: "AIzaSyB3Z_jPfdW98gdvUn25nOOBinXKvOYDhqU", language: "en" }}
            fetchDetails
            styles={{
              container: { flex: 0 },
              textInput: styles.input,
              listView: styles.autocompleteList,
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
            }}
            enablePoweredByContainer={false}
            minLength={2}
          />
        </View>

        <MapView
          style={styles.map}
          region={{
            latitude: fromCoords.latitude,
            longitude: fromCoords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={fromCoords} title="Origin" />
          <Marker coordinate={toCoords} title="Destination" />
          <Circle
            center={fromCoords}
            radius={radius * 1000}
            strokeColor="rgba(255,0,0,0.5)"
            fillColor="rgba(255,0,0,0.2)"
          />
        </MapView>

        <View style={styles.bottomContainer}>
          <Text style={styles.label}>Pickup Radius (km):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={radius.toString()}
            onChangeText={(value) => setRadius(Number(value))}
          />

          <Text style={styles.label}>Available Seats:</Text>
          <View style={styles.seatControls}>
            <TouchableOpacity
              onPress={() => setSeats(Math.max(1, seats - 1))}
            >
              <Ionicons name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.seatCount}>{seats}</Text>
            <TouchableOpacity onPress={() => setSeats(seats + 1)}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Light luggage, pets included..."
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Publish Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  autocompleteContainer: {
    zIndex: 2,
    marginBottom: 10,
  },
  bottomContainer: {
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  autocompleteList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  map: {
    height: 300,
    marginBottom: 20,
    zIndex: 1,
  },
  seatControls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  seatCount: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#FF5A5F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});