import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Logo from '../assets/images/splash-icon2.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const greenColor = '#34BF02';
    const googleIconSource = { uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" };

    const handleSignIn = async () => {
        router.push("/home")
        await AsyncStorage.setItem("language", "English")
    };

    const handleForgotPassword = () => {
        router.push("/forgot")
    };

    const handleSignUp = () => {
        router.push("/register")
    };

    const handleGoogleSignIn = () => {
        console.log('Sign in with Google');
        router.push("/home")
    };

    const handleAppleSignIn = () => {
        router.push("/home")
        console.log('Sign in with Apple');
    };

    return (
        <View style={styles.container}>




            <View style={{ backgroundColor: "#34BF02", height: 220, justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={{ height: 100, width: 200 }} />
                </View>
            </View>



            <View style={{ paddingHorizontal: 10, backgroundColor: "#fff", position: "absolute", top: 180, left: 20, right: 20, borderRadius: 10 }}>

                {/* Welcome Back Text */}
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subtitle}>Your journey starts here!</Text>

                {/* Email Input */}
                {/* <View style={styles.inputContainer}>
                    <FontAwesome name="envelope-o" size={20} color="gray" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="gray" keyboardType="email-address" value={email} onChangeText={setEmail} />
                </View> */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="phone" size={20} color="gray" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="gray" keyboardType="number-pad" value={email} onChangeText={setEmail} />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="gray" secureTextEntry={true} value={password} onChangeText={setPassword} />
                </View>

                {/* Sign In Button */}
                <TouchableOpacity style={[styles.signInButton, { backgroundColor: greenColor }]} onPress={handleSignIn}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>

                {/* Or */}
                <Text style={styles.orText}>Or</Text>

                {/* Sign in with Google */}
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                    <Image source={googleIconSource} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Sign in with Google</Text>
                </TouchableOpacity>

                {/* Sign in with Apple */}
                <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
                    <FontAwesome name="apple" size={20} color="black" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Sign in with Apple</Text>
                </TouchableOpacity>

                {/* Don't have an account */}
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={[styles.bottomText, { color: greenColor, fontWeight: 'bold' }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-between',
        position: "relative"
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        color: '#2ECC71',
        fontSize: 32,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 30
    },
    subtitle: {
        color: 'gray',
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    icon: {
        marginRight: 15,
    },
    input: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        paddingVertical: 15,
    },
    signInButton: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    signInText: {
        color: '#fff',
    },
    forgotPasswordText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    orText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 15,
        justifyContent: 'center',
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 15,
    },
    socialButtonText: {
        color: '#000',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    bottomText: {
        color: 'gray',
        fontSize: 16,
    },
});

export default Login;