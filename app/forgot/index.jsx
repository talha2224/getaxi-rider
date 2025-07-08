import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const Email = () => {
  const [email, setEmail] = useState('');
  const greenColor = '#2ECC71';

  const handleProceed = () => {
    console.log('Proceeding with email:', email);
    router.push("/forgot/otp")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subtitle}>Enter the associated email address</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope-o" size={20} color="gray" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="gray" keyboardType="email-address"value={email}onChangeText={setEmail}/>
      </View>

      <TouchableOpacity style={[styles.proceedButton, { backgroundColor: greenColor }]} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 30,
    paddingTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom:5,
  },
  subtitle: {
    color: '#777',
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    paddingVertical: 15,
  },
  proceedButton: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Email;