import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (timer === 0) {
            console.log('OTP timer expired');
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

    const handleProceed = () => {
        const enteredOtp = otp.join('');
        console.log('Entered OTP:', enteredOtp);
        router.push("/profile")
    };

    const handleResend = () => {
        if (timer === 0) {
            console.log('Resending OTP');
            setTimer(60); // Reset the timer
            setOtp(['', '', '', '', '', '']); // Clear OTP input fields
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
            // Implement your OTP resend API call here
        } else {
            console.log('Resend available after timer expires');
            // Optionally show a message to the user
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>Enter the OTP code sent to your mobile number</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput key={index} style={styles.otpInput} maxLength={1} keyboardType="number-pad" value={digit} onChangeText={(text) => handleInputChange(index, text)} onKeyPress={(nativeEvent) => handleKeyPress(index, nativeEvent)} ref={(ref) => (inputRefs.current[index] = ref)} autoFocus={index === 0} />
                ))}
            </View>

            <Text style={styles.timer}>{formatTime(timer)}</Text>

            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
                <Text style={[styles.resendText, timer > 0 && styles.disabledResendText]}>Didn't receive any code? <Text style={styles.resendLink}>Resend</Text></Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 30,
        paddingTop: 60
    },
    content: {
        // width: '100%',
        // maxWidth: 400,
        // alignItems: 'center',
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
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
        fontSize: 18,
        marginBottom: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
    disabledResendText: {
        color: '#ccc',
    },
});

export default Otp;