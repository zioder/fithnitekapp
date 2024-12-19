import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
import app from '../firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';


const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  const router = useRouter();
  const [loaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  async function loginEmailPassowrd(){
    try {
      setLoading(true)
      const auth = getAuth(app)
      const response = await signInWithEmailAndPassword(auth, email, password);
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, "users", response.user.uid));
      const userData = userDoc.data();
      if (userData) {
        Alert.alert("Success", `${userData.name} has been logged in successfully`);
      } else {
        Alert.alert("Error", "User data not found");
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      Alert.alert("Error","error occured while logging in")
   
  }
  }  


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={()=>{router.push('/')}}>
        <Text style={styles.backText}> {"<"} Back </Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Sign in with your email</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail} />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, { flex: 1 }]}
          placeholder="Enter Your Password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.togglePassword}>{showPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions */}
     

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={loginEmailPassowrd} >
        <Text style={styles.signUpText}>Sign in</Text>
      </TouchableOpacity>

      {/* Social Signup Options */}
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>📧 Sign in with Gmail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>📘 Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>🍎 Sign in with Apple</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Text onPress={()=>{router.push("/signup")}} style={styles.linkText}> Sign up</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    fontFamily:"Poppins"
  },
  backText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    fontFamily:"Poppins"

  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
    fontFamily:"Poppins"

  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    fontFamily:"Poppins"

  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    fontFamily:"Poppins"

  },
  prefix: {
    fontSize: 16,
    color: "#000",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 0,
    backgroundColor: "#f9f9f9",
    fontFamily:"Poppins"

    
  },
  togglePassword: {
    fontSize: 18,
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily:"Poppins"

  },
  linkText: {
    color: "#007BFF",
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "#FF5630",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 0,
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily:"Poppins"

  },
  orText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: "center",
    fontFamily:"Poppins"
  },
  socialText: {
    fontSize: 16,
    color: "#000",
    fontFamily:"Poppins"

  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontFamily:"Poppins"

  },
  passwordInput: {
    padding: 10,
    marginBottom: 0,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    fontFamily:"Poppins"

  }
});

export default LoginScreen;
