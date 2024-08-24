import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Button from './../(components)/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { getFirestore ,doc,setDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';
const register = () => {
const db = getFirestore(app)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobString, setDobString] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});


  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateDob = (dob) => {
    const today = new Date();
    const dobDate = new Date(dob);
    return today.getFullYear() - dobDate.getFullYear() >= 10;
  };

  const opneCalander = () => {
    try {
      DateTimePickerAndroid.open({
        value: new Date(dob),
        mode: 'spinner',
        onChange: (event, selectedDate) => {
          if (event.type === 'set') {
            setDob(selectedDate);
            setDobString(selectedDate.toLocaleDateString());
          }
        },
      });
    } catch ({ code, message }) {
      console.error('Cannot open date picker', message);
    }
  };

  const handleRegister = async () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email || !validateEmail(email)) {
      errors.email = 'Invalid email';
    }
    if (!password || !validatePassword(password)) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword || !validateConfirmPassword(password, confirmPassword)) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!dob || !validateDob(dob)) {
      errors.dob = 'You must be at least 10 years old';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
          name,
          dob: dobString,
          habits: {},
        });
        console.log('User data written to Firestore');
        router.replace('/login');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.helloMessageContainer}>
        <Text style={styles.helloMessage}>Journey Starts Here..</Text>
      </View>
      <View style={styles.rowCenter}>
        <Image style={styles.Register} source={require('./../../assets/Register.png')} />
      </View>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color='#ccc' />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color='#ccc' />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={dobString}
            onChangeText={(text) => setDobString(text)}
            placeholder="Date of Birth"
          />
          <TouchableOpacity onPress={opneCalander}>
            <Ionicons name="calendar" size={24} color='#ccc' />
          </TouchableOpacity>
        </View>


        {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

        <View style={{ flexDirection: 'column' }}>
          <View style={styles.rowCenter}>
            <Button
              height={50}
              width={'80%'}
              borderColor="#ccc"
              borderRadius={10}
              backgroundColor="#8ecdec"
              value="Register"
              elevation={5}
              buttonTextHeight={22}
              onPress={handleRegister}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <TouchableOpacity style={styles.rowCenter} onPress={() => router.replace('/login')}>
            <Text>Already a User? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  helloMessageContainer: {
    top: -30,
    alignItems: 'center',
  },
  helloMessage: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
  },
  Register: {
    width: 350,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});


