import { StyleSheet, Text, Image, View, TextInput, SafeAreaView,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../(components)/Button';
import { router } from 'expo-router';
import app from './../../firebaseConfig';
import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';

const Login = ({ name }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const auth = getAuth(app);

     const handleLogin = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('Login successful');
        } catch (error) {
          console.error('Login failed', error);
        }
      };
      const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider(app);
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log('Google sign-in successful');
  } catch (error) {
    console.error('Google sign-in failed', error);
  }
};

    return (  
        <SafeAreaView style={styles.container}>
            <View style={styles.helloMessageContainer}>
                <Text style={styles.helloMessage}>Hey {name}!</Text>
                <Text style={styles.helloMessage}>Welcome Back</Text>
            </View>
            <View style={styles.rowCenter}>
                <Image
                    style={styles.girl_login}
                    source={require('./../../assets/girl_login.png')} />
            </View>
            <View style={styles.card}>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    keyboardType="email-address"
                />
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
                <View style={{ flexDirection: 'column' }}>

                    <View style={styles.rowCenter}>
                        <Button
                            height={50}
                            width={'80%'}
                            borderColor="#ccc"
                            borderRadius={10}
                            backgroundColor="#8ecdec"
                            value="Login"
                            elevation={5}
                            buttonTextHeight={22}
                            onPress={handleLogin}

                        />
                    </View>

                    <View style={styles.rowCenter}><Text>or</Text></View>
                    <View style={styles.rowCenter}>
                        <Button
                            height={50}
                            width={'50%'}
                            borderColor="#ccc"
                            borderRadius={10}
                            backgroundColor="white"
                            value="Sign in with Google"
                            onPress={handleGoogleSignIn}
                            icon="google"
                            buttonTextHeight={16}
                        />
                    </View>

                    <TouchableOpacity style={{ ...styles.rowCenter, marginTop: 7 }} onPress={() => router.replace('/register')}>
                        <Text>Not a user? Register Now</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    helloMessageContainer: { top: -30 },
    helloMessage: {
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10,
    },
    girl_login: {
        width: 200,
        height: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -30
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
        borderRadius: 10
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    button: {

    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});