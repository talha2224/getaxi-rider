import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const greenColor = '#2ECC71';
  const progressBackgroundColor = '#F1F5F9';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log('OTP timer expired');
      // Optionally enable resend button visually
    }
  }, [timer]);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, nativeEvent) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleGetOtpCode = () => {
    console.log('Getting OTP for:', phoneNumber);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const handleProceed = () => {
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp, 'for phone:', phoneNumber);
    router.push('/profile/name')
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      if (inputRefs.current[0]) { inputRefs.current[0].focus(); }
    }
    else {
      console.log('Resend available after timer expires');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBackground, { backgroundColor: progressBackgroundColor }]}>
          <View style={[styles.progressBarFill, { backgroundColor: greenColor, width: '20%' }]} />
        </View>
        <Text style={styles.stepText}>Step 1 of 5</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Phone Verification</Text>
        <Text style={styles.subtitle}>Enter verification code which is sent to your phone number and secure your account</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput key={index} style={styles.otpInput} keyboardType="number-pad" value={digit} onChangeText={(text) => handleInputChange(index, text)} onKeyPress={(nativeEvent) => handleKeyPress(index, nativeEvent)} ref={(ref) => (inputRefs.current[index] = ref)} />
          ))}
        </View>

        <Text style={styles.timer}>({formatTime(timer)})</Text>


        <TouchableOpacity style={[styles.proceedButton, { backgroundColor: greenColor }]} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={[styles.resendText, timer > 0 && styles.disabledResendText]}>Didn't receive any code? <Text style={styles.resendLink}>Resend</Text></Text>
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
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,

    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    color: '#777',
    fontSize: 16,
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  icon: {
    marginRight: 15,
  },
  phoneInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    paddingVertical: 15,
  },
  getOtpButton: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  getOtpButtonText: {
    color: 'white',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  otpInput: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  timer: {
    color: '#ff6b6b',
    fontSize: 16,
    marginVertical: 10,
  },
  proceedButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  proceedButtonText: {
    color: 'white',
  },
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    color: '#777',
    fontSize: 16,
  },
  resendLink: {
    color: '#2ecc71',

  },
  disabledResendText: {
    color: '#ccc',
  },
});

export default Phone;