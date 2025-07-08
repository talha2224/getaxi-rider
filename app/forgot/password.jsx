import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const greenColor = '#2ECC71';

  const handleProceed = () => {
    if (password === confirmPassword && password.length >= 6) {
        router.push("/forgot/final")
    } 
    else if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } 
    else {
      alert('Password must be at least 6 characters long.');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Create a new password</Text>
      <Text style={styles.subtitle}>Create a new password</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput style={styles.input}placeholder="Password"placeholderTextColor="gray"secureTextEntry={true} value={password} onChangeText={setPassword}/>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Confirm password" placeholderTextColor="gray" secureTextEntry={true}value={confirmPassword}onChangeText={setConfirmPassword}/>
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
    paddingTop:60
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
    marginBottom: 15,
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
    marginTop: 20,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Password;