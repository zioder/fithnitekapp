import React, { useEffect, useState , } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function PublishRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [showPicker, setShowPicker] = useState(false);
  const [userName, setUserName] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData && userData.fullName) {
          setUserName(userData.fullName);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleDateChange = (_: any, selectedDate?: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePublishRide = async () => {
    if (!from || !to) {
      Alert.alert('Error', 'Both origin and destination must be filled');
      return;
    }
    const user = auth.currentUser;
    if (user) {
      try {
        const rideData = {
          from,
          to,
          date: date.toISOString(),
          seats,
          userName,
          userId: user.uid,
        };
        await setDoc(doc(db, 'rides', `${user.uid}_${Date.now()}`), rideData);
        Alert.alert('Success', 'Ride published successfully!');
      } catch (error) {
        console.error('Error publishing ride', error);
        Alert.alert('Error', 'Failed to publish ride');
      }
    }
  };
  return (
    <View style={styles.container}>
         <View style={styles.ss_container}>
         <Text style={styles.greeting}>Hello, {userName}</Text>
      <Text style={styles.title}>Publish a ride</Text>
      <Text style={styles.label}>Origin :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter starting point"
        value={from}
        onChangeText={setFrom}
      />
      <Text style={styles.label}>Destination :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        value={to}
        onChangeText={setTo}
      />
     <Text style={styles.label}>Date and Time :</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>
      {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Seats Available?</Text>
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
      </View>
      <View style={styles.button}>
      <TouchableOpacity >
               <Text style={styles.buttonText} onPress={handlePublishRide}>Publish Ride</Text>
      </TouchableOpacity>
  </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 20,
    marginBottom: 10,
  },
    ss_container: {
        flex: 1,
        padding: 20,
        justifyContent:"center", // Center vertically
        alignItems: "stretch", // Stretch components horizontally
        backgroundColor: "#fff",
    },
    lineBreak: {
        height: 20, // Space to simulate a line break
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
    fontSize: 16,
    marginHorizontal: 20,
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
