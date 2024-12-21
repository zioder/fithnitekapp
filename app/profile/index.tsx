import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context';

const EditProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [LastSet, LastSetEdit] = useState('Jan. 2nd, 2024');
  const [fullName, setFullName] = useState('Amira Balti');
  const [email, setEmail] = useState('email@email.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [image, setImage] = useState('https://media.licdn.com/dms/image/v2/D5603AQHEKqeQIjzYkA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703364653539?e=2147483647&v=beta&t=JfsOg2iiKOxWUyOSx3gRAcwhuLOQtdkhMkv0WiinTcY');

  const {user} = useSession()
  const router = useRouter()

  
  useEffect(()=>{
    console.log(user)

    
  }, [])

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved!');
  };

  const handleChangePassword = () => {
    console.log('Password changed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text onPress={()=>{router.replace("/")}} style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imgcont}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: image }} style={styles.profilePicture} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.changePictureButton}>
            <Text style={styles.changePictureText}>Change Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.changePictureButton, styles.editButton]} 
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.changePictureText}>{isEditing ? 'View Profile' : 'Edit Profile'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isEditing ? (
        <>
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
        </>
      ) : (
        <>
          <View style={styles.displayField}>
            <Text style={styles.displayLabel}>Full Name</Text>
            <Text style={styles.displayValue}>{fullName}</Text>
          </View>
          
          <View style={styles.displayField}>
            <Text style={styles.displayLabel}>Email</Text>
            <Text style={styles.displayValue}>{email}</Text>
          </View>
          
          <View style={styles.displayField}>
            <Text style={styles.displayLabel}>Phone Number</Text>
            <Text style={styles.displayValue}>{phoneNumber}</Text>
          </View>
        </>
      )}

      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>

      <Text style={styles.passwordDateText}>Last set {LastSet}</Text>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  changePictureButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
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
  displayField: {
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  displayLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  displayValue: {
    fontSize: 16,
    color: '#333',
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