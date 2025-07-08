import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState('Cash');
    const greenColor = '#2ECC71';
    const progressBackgroundColor = '#F1F5F9';

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
    };

    const handleProceed = () => {
        console.log('Selected Payment Method:', selectedPayment);
        router.push("/profile/terms")
    };

    return (
        <View style={styles.container}>

            <View style={styles.progressContainer}>
                <View style={[styles.progressBarBackground, { backgroundColor: progressBackgroundColor }]}>
                    <View style={[styles.progressBarFill, { backgroundColor: greenColor, width: '80%' }]} />
                </View>
                <Text style={styles.stepText}>Step 4 of 5</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Payment method</Text>
                <Text style={styles.subtitle}>Set your preferred payment method</Text>

                <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('Cash')}>
                    <FontAwesome name="money" size={20} color="#14AE5C" style={styles.paymentIcon} />
                    <Text style={styles.paymentText}>Cash</Text>
                    {selectedPayment === 'Cash' && (<AntDesign name="checkcircle" size={24} color={greenColor} />)}
                </TouchableOpacity>


                {
                    Platform.OS === "android" ?
                        <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('Google Pay')}>
                            <FontAwesome5 name="google-pay" size={24} color="blue" />
                            <Text style={styles.paymentText}>Google Pay</Text>
                            {selectedPayment === 'Google Pay' && (<AntDesign name="checkcircle" size={24} color={greenColor} />)}
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.paymentOption} onPress={() => handlePaymentSelect('Apple Pay')}>
                            <FontAwesome name="apple" size={20} color="black" style={styles.paymentIcon} />
                            <Text style={styles.paymentText}>Apple Pay</Text>
                            {selectedPayment === 'Apple Pay' && (<AntDesign name="checkcircle" size={24} color={greenColor} />)}
                        </TouchableOpacity>

                }


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
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    paymentText: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        flex: 1,
    },
    paymentIcon: {
        width: 20,
        textAlign: 'center',
    },
    proceedButton: {
        backgroundColor: '#2ecc71',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    proceedButtonText: {
        color: 'white',
    },
});

export default Payment;