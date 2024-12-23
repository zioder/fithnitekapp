import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { getAuth } from 'firebase/auth';

export default function FindRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
  const [seats, setSeats] = useState(1);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date | undefined)=> {
      console.log(date?.toISOString())
      setShowDatePicker(false);
  
      if (date) {
        setDate(date);
  
      }
      if (event.type == 'dismissed'){
        setShowDatePicker(false);
      }
    };

    
  

  const handleSearch = () => {

    if (!from || !to || from.trim() === "" || to.trim() === "") {
      Alert.alert('Error', 'Both origin and destination must be filled');
      return;
  }

    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return;
    }

    if (!from || !to || from.trim() === "" || to.trim() === "") {
            Alert.alert('Error', 'Both origin and destination must be filled');
            return;
        }

    // Pass search parameters to the publisheddrives screen
    router.push({
      pathname: '/publisheddrives',
      params: {
        from,
        to,
        date: date.toLocaleDateString(),
        seats: seats.toString(),
        userId: currentUser.uid
      }
    });
  };

  return (
    <View style={styles.container}>
         <View style={styles.ss_container}>
      <Text style={styles.title}>Find a ride</Text>
      <Text style={styles.label}>Where are you going ?.</Text>
      <TextInput
        style={styles.input}
        placeholder="From"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="To"
        value={to}
        onChangeText={setTo}
      />
     <Text style={styles.label}>When</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{date.toLocaleDateString("en-US")}</Text>
      </TouchableOpacity>
      {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Seats needed?</Text>
        <View style={styles.seatControls}>
          <TouchableOpacity
            onPress={() => setSeats(Math.max(1, seats - 1))}
          >
            <Ionicons name="remove-circle-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.seatCount}>{seats}</Text>
          <TouchableOpacity onPress={() => setSeats(seats + 1)}>
            <Ionicons name="add-circle-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
      <TouchableOpacity >
    <TouchableOpacity onPress={handleSearch} >
      <Text style={styles.buttonText}>Find Ride</Text>
    </TouchableOpacity>
  </TouchableOpacity>
  </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
    ss_container: {
        flex: 1,
        padding: 20,
        justifyContent:"center", // Center vertically
        alignItems: "stretch", // Stretch components horizontally
        backgroundColor: "#fff",
    },
  container: {
    flex: 1,
    padding: 20,
    justifyContent:"space-around", // Center vertically
    alignItems: "stretch", // Stretch components horizontally
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f0f0f0", // Light gray background
    borderWidth: 1,
    borderColor: "#ccc", // Optional border
    borderRadius: 8,
    padding: 15, // Increase padding for a larger input
    marginBottom: 20,
    fontSize: 18, // Bigger font size
    width: "100%", // Stretch to full width
  },
  seatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  seatControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  seatCount: {
    fontSize: 20,
    marginHorizontal: "5%",
  },
  button: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 50, // Space above the button
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
