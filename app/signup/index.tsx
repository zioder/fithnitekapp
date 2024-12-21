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
import app from '../firebaseConfig';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require("../../assets/fonts/Poppins-Regular.ttf")
  });

async function registerEmailPassowrd(){
  try {
    setLoading(true)
    const auth = getAuth(app)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Get reference to Firestore
    const db = getFirestore(app);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      createdAt: new Date().toISOString()
    });
    const response = await signInWithEmailAndPassword(auth, email, password);
    setLoading(false)
    router.push('/trackRide'); // Route to the first tab screen// Routes to the tabbed navigation layout
    Alert.alert("Success", `${name} has been registered successfully`);
  } catch (error) {
    console.log(error)
    setLoading(false)
    Alert.alert("Error","error occured while registering")
}
}

  const router = useRouter()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={()=>{router.push("/")}}>
        <Text style={styles.backText}> {"<"} Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Sign up with your email or phone number</Text>

      {/* Input Fields */}
      <TextInput 
  style={styles.input} 
  placeholder="Name" 
  onChangeText={setName}
/>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
      <View style={styles.rowInput}>
        <Text style={styles.prefix}>+216</Text>
        <TextInput
          style={[styles.phoneNumberinput, { flex: 1, marginLeft: 0 }]}
          placeholder="Your mobile number"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
      </View>
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
      <Text style={styles.termsText}>
        By signing up, you agree to the{" "}
        <Text style={styles.linkText}>Terms of service</Text> and{" "}
        <Text style={styles.linkText}>Privacy policy</Text>.
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={registerEmailPassowrd}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Social Signup Options */}
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>📧 Sign up with Gmail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>📘 Sign up with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>🍎 Sign up with Apple</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text onPress={()=>{router.push("/login")}} style={styles.linkText}>Sign In</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:60,
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
    borderRadius: 2,
    backgroundColor: "#f9f9f9",
    fontFamily:"Poppins"

  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    fontFamily:"Poppins"

  },
  togglePassword: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily:"Poppins"

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
    fontFamily:"Poppins"

  },
  signUpButton: {
    backgroundColor: "#FF5630",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    fontFamily:"Poppins"

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
    fontFamily:"Poppins"

  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
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

  },
  phoneNumberinput:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    padding: 10,
    marginBottom: 0,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    fontFamily:"Poppins"


  }
  
});

export default SignUpScreen;
