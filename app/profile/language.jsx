import React, { useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('Ukraine');
    const greenColor = '#2ECC71';
    const progressBackgroundColor = '#F1F5F9';

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
    };

    const handleProceed = () => {
        console.log('Selected Language:', selectedLanguage);
        router.push("/profile/payment")
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBarBackground, { backgroundColor: progressBackgroundColor }]}>
                    <View style={[styles.progressBarFill, { backgroundColor: greenColor, width: '60%' }]} />
                </View>
                <Text style={styles.stepText}>Step 3 of 5</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Preferred language</Text>
                <Text style={styles.subtitle}>Set your preferred language</Text>

                <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageSelect('Ukraine')}>
                    <Text style={styles.languageText}>Ukraine</Text>
                    {selectedLanguage === 'Ukraine' && (
                        <AntDesign name="checkcircle" size={24} color={greenColor} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageSelect('English')}>
                    <Text style={styles.languageText}>English</Text>
                    {selectedLanguage === 'English' && (
                        <AntDesign name="checkcircle" size={24} color={greenColor} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.languageOption} onPress={() => handleLanguageSelect('Russian')}>
                    <Text style={styles.languageText}>Russian</Text>
                    {selectedLanguage === 'Russian' && (
                        <AntDesign name="checkcircle" size={24} color={greenColor} />
                    )}
                </TouchableOpacity>

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
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    languageText: {
        fontSize: 18,
        color: '#333',
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

export default Language;