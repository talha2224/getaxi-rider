import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const Name = () => {
  const [fullName, setFullName] = useState('');
  const greenColor = '#2ECC71';
  const progressBackgroundColor = '#F1F5F9';

  const handleProceed = () => {
    console.log('Full Name:', fullName);
    router.push("/profile/language")
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBackground, { backgroundColor: progressBackgroundColor }]}>
          <View style={[styles.progressBarFill, { backgroundColor: greenColor, width: '40%' }]} />
        </View>
        <Text style={styles.stepText}>Step 2 of 5</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Personal Details</Text>
        <Text style={styles.subtitle}>Add your name to personalize your experience. You can update these later</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user-o" size={20} color="gray" style={styles.icon} />
          <TextInput style={styles.input}placeholder="Full name"placeholderTextColor="gray"value={fullName}onChangeText={setFullName}/>
        </View>

        <TouchableOpacity style={[styles.proceedButton, { backgroundColor: greenColor }]} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 5,
    borderRadius: 100,
  },
  progressBarFill: {
    height: 5,
    borderRadius: 100,
  },
  stepText: {
    color: '#475569',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    width: '100%',
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
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  proceedButtonText: {
    color: 'white',
  },
});

export default Name;