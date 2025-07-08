import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';


const translations = {
    English: {
        PaymentMethods: "Payment methods",
        BankCard: "Bank Card",
        GooglePay: "Google Pay",
        ApplePay: "Apple Pay",
        Save: "Save",
    },
    Russian: {
        PaymentMethods: "Способы оплаты",
        BankCard: "Банковская карта",
        GooglePay: "Google Pay",
        ApplePay: "Apple Pay",
        Save: "Сохранить",
    },
    Ukrainian: {
        PaymentMethods: "Способи оплати",
        BankCard: "Банківська картка",
        GooglePay: "Google Pay",
        ApplePay: "Apple Pay",
        Save: "Зберегти",
    },
};

const getTranslations = async (language) => {
    try {
        if (translations[language]) {
            return translations[language];
        }
        return translations["English"];
    }
    catch (error) {
        console.error("Error fetching language:", error);
        return translations["English"];
    }
};

const useLanguage = () => {
    const [words, setWords] = useState(translations.English);

    useFocusEffect(
        useCallback(() => {
            const fetchTranslations = async () => {
                const language = await AsyncStorage.getItem("language");
                const translatedWords = await getTranslations(language);
                setWords(translatedWords);
            };
            fetchTranslations();
        }, [])
    );

    return words;
};


const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState('Bank Card');
    const { isDarkTheme } = useTheme();
    const words = useLanguage();

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
    };

    const handleSave = () => {
        console.log('Selected Payment Method:', selectedMethod);
        router.back();
    };

    const colors = {
        background: isDarkTheme ? '#0F172A' : '#fff',
        text: isDarkTheme ? '#fff' : '#000',
        border: isDarkTheme ? '#334155' : '#eee',
        icon: isDarkTheme ? '#fff' : '#000',
        radioBorder: isDarkTheme ? '#888' : '#ccc',
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={colors.icon} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>{words.PaymentMethods}</Text>
            </View>

            {/* Payment Options */}
            <TouchableOpacity
                style={[styles.paymentOption, { borderBottomColor: colors.border }]}
                onPress={() => handleSelectMethod('Bank Card')}
            >
                <View style={styles.paymentIcon}>
                    <Ionicons name="card" size={24} color="#27AE60" />
                </View>
                <Text style={[styles.paymentText, { color: colors.text }]}>{words.BankCard}</Text>
                {selectedMethod === 'Bank Card' ? (
                    <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
                ) : (
                    <View style={[styles.radioOuter, { borderColor: colors.radioBorder }]}>
                        <View style={styles.radioInner}></View>
                    </View>
                )}
            </TouchableOpacity>

            {Platform.OS === 'android' ? (
                <TouchableOpacity
                    style={[styles.paymentOption, { borderBottomColor: colors.border }]}
                    onPress={() => handleSelectMethod('Google Pay')}
                >
                    <View style={styles.paymentIcon}>
                        <Ionicons name="logo-google" size={24} color={colors.icon} />
                    </View>
                    <Text style={[styles.paymentText, { color: colors.text }]}>{words.GooglePay}</Text>
                    {selectedMethod === 'Google Pay' ? (
                        <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
                    ) : (
                        <View style={[styles.radioOuter, { borderColor: colors.radioBorder }]}>
                            <View style={styles.radioInner}></View>
                        </View>
                    )}
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.paymentOption, { borderBottomColor: colors.border }]}
                    onPress={() => handleSelectMethod('Apple Pay')}
                >
                    <View style={styles.paymentIcon}>
                        <Ionicons name="logo-apple" size={24} color={colors.icon} />
                    </View>
                    <Text style={[styles.paymentText, { color: colors.text }]}>{words.ApplePay}</Text>
                    {selectedMethod === 'Apple Pay' ? (
                        <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
                    ) : (
                        <View style={[styles.radioOuter, { borderColor: colors.radioBorder }]}>
                            <View style={styles.radioInner}></View>
                        </View>
                    )}
                </TouchableOpacity>
            )}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>{words.Save}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  paymentIcon: {
    marginRight: 15,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    fontSize: 16,
    flex: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Payment;
