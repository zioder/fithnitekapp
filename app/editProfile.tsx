import { router } from 'expo-router';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const EditProfileScreen = () => {
  const [lastSet, setLastSet] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(''); // Placeholder image URL

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData) {
          setFullName(userData.fullName || '');
          setEmail(userData.email || '');
          setPhoneNumber(userData.phoneNumber || '');
          setImage(userData.image || '');
          setLastSet(userData.lastSet || '');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: fullName,
          photoURL: image,
        });

        await updateDoc(doc(db, 'users', user.uid), {
          fullName,
          email,
          phoneNumber,
          image,
          lastSet: new Date().toLocaleDateString(),
        });

        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile', error);
        Alert.alert('Error', 'Failed to update profile');
      }
    }
  };
  const handleChangePassword = () => {
    // Handle change password logic here
    console.log('Password changed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{
          
          router.back()}}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imgcont}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: image }} style={styles.profilePicture} />
        </View>
        <TouchableOpacity style={styles.changePictureButton}>
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>
      <Text style={styles.passwordDateText}>Last set {lastSet}</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007bff',
  },
  title: {
    fontSize: 24,
    color: "#ec4d37",
  },
  imgcont: {
    alignItems: "center",
  },
  profilePictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "black",
    width: 148.889,
    height: 148.889,
    borderRadius: 148.889 / 2,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 148.889 / 2,
    resizeMode: "cover",
  },
  changePictureButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  changePictureText: {
    color: '#007bff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
  },
  changePasswordButton: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  changePasswordText: {
    color: '#007bff',
    textAlign: 'center',
  },
  passwordDateText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#ec4d37',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;