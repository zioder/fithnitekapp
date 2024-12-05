import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const EditProfileScreen = () => {
  const [LastSet, LastSetEdit] = useState('Jan. 2nd, 2024');
  const [fullName, setFullName] = useState('Amira Balti');
  const [email, setEmail] = useState('email@email.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [image, setImage] = useState('https://media.licdn.com/dms/image/v2/D5603AQHEKqeQIjzYkA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703364653539?e=2147483647&v=beta&t=JfsOg2iiKOxWUyOSx3gRAcwhuLOQtdkhMkv0WiinTcY'); // Placeholder image URL

  const handleSave = () => {
    // Handle save logic here
    console.log('Profile saved!');
  };

  const handleChangePassword = () => {
    // Handle change password logic here
    console.log('Password changed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
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

      <Text style={styles.passwordDateText}>Last set {LastSet}</Text>

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
    alignItems: "center", // Center the content inside the container
  },
  profilePictureContainer: {
    alignItems: "center",
    justifyContent: "center", // Ensure the image is centered inside the container
    marginVertical: 20,
    backgroundColor: "black", // Black background
    width: 148.889, // Container width
    height: 148.889, // Container height to make it a circle
    borderRadius: 148.889 / 2, // Make the container circular
  },
  profilePicture: {
    width: "100%", // The image will take the full width of the container
    height: "100%", // The image will take the full height of the container
    borderRadius: 148.889 / 2, // Make the image circular, matching the container's radius
    resizeMode: "cover", // Ensure the image covers the entire space without distortion
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
