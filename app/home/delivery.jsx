import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavbar from '../../components/BottomNavbar';
import { useTheme } from '../../hooks/themeContext';


const translations = {
    English: {
        Delivery: "What are you sending today?",
        Location: "Location",
        PickupLocation: "Pickup location",
        DeliveryAddress: "Delivery address",
        PackageType: "Select package type",
        Small: "Small",
        Medium: "Medium",
        Large: "Large",
        DeliveryType: "Select delivery type",
        Standard: "Standard",
        Express: "Express",
        RecipientDetails: "Recipient's contact details",
        RecipientName: "Recipient's name",
        PhoneNumber: "Phone number",
        AdditionalNotes: "Additional notes",
        FareCalculation: "Fare calculation",
        PaymentMethod: "Payment method",
        RequestDelivery: "Request delivery",
        Cash: "Cash",
    },
    Russian: {
        Delivery: "Что вы отправляете сегодня?",
        Location: "Местоположение",
        PickupLocation: "Место забора",
        DeliveryAddress: "Адрес доставки",
        PackageType: "Выберите тип упаковки",
        Small: "Маленький",
        Medium: "Средний",
        Large: "Большой",
        DeliveryType: "Выберите тип доставки",
        Standard: "Стандартный",
        Express: "Экспресс",
        RecipientDetails: "Контактные данные получателя",
        RecipientName: "Имя получателя",
        PhoneNumber: "Номер телефона",
        AdditionalNotes: "Дополнительные примечания",
        FareCalculation: "Расчет стоимости",
        PaymentMethod: "Способ оплаты",
        RequestDelivery: "Заказать доставку",
        Cash: "Наличные",
    },
    Ukrainian: {
        Delivery: "Що ви відправляєте сьогодні?",
        Location: "Місцезнаходження",
        PickupLocation: "Місце забору",
        DeliveryAddress: "Адреса доставки",
        PackageType: "Виберіть тип пакування",
        Small: "Малий",
        Medium: "Середній",
        Large: "Великий",
        DeliveryType: "Виберіть тип доставки",
        Standard: "Стандартний",
        Express: "Експрес",
        RecipientDetails: "Контактні дані одержувача",
        RecipientName: "Ім'я одержувача",
        PhoneNumber: "Номер телефону",
        AdditionalNotes: "Додаткові примітки",
        FareCalculation: "Розрахунок вартості",
        PaymentMethod: "Спосіб оплати",
        RequestDelivery: "Замовити доставку",
        Cash: "Готівка",
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
const Delivery = () => {
    const { isDarkTheme } = useTheme();
    const words = useLanguage();

    const [pickupLocation, setPickupLocation] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [packageType, setPackageType] = useState('Large');
    const [deliveryType, setDeliveryType] = useState('Express');
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [fare, setFare] = useState('₴1,200');

    const handlePackageTypeSelect = (type) => {
        setPackageType(type);
    };

    const handleDeliveryTypeSelect = (type) => {
        setDeliveryType(type);
    }

    const handleRequestDelivery = () => {
        console.log('Delivery requested:', {
            pickupLocation,
            deliveryAddress,
            packageType,
            deliveryType,
            recipientName,
            recipientPhone,
            additionalNotes,
            paymentMethod,
            fare,
        });

        router.push('/home/map');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#0F172A' : '#fff' }]}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.title, { color: isDarkTheme && "#fff", marginTop: 20 }]}>{words.Delivery}</Text>

                {/* Location */}
                <Text style={[styles.label, { color: isDarkTheme && "#fff" }]}>{words.Location}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.iconInputWrapper}>
                        <Ionicons name="radio-button-on-outline" size={20} color="#777" />
                        <TextInput
                            style={{ flex: 1,color:isDarkTheme && "#fff"}}
                            placeholder={words.PickupLocation}
                            value={pickupLocation}
                            placeholderTextColor={isDarkTheme ? "#fff":"#000"}
                            onChangeText={setPickupLocation}
                        />
                    </View>
                    <TouchableOpacity style={styles.locationIcon}>
                        <Ionicons name="locate-outline" size={20} color="#777" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.iconInputWrapper}>
                        <Ionicons name="location-outline" size={20} color="#27AE60" />
                        <TextInput
                            style={{ flex: 1,color:isDarkTheme && "#fff"}}
                            placeholder={words.DeliveryAddress}
                            value={deliveryAddress}
                            placeholderTextColor={isDarkTheme ? "#fff":"#000"}
                            onChangeText={setDeliveryAddress}
                        />
                    </View>
                    <TouchableOpacity style={styles.locationIcon}>
                        <Ionicons name="map-outline" size={20} color="#777" />
                    </TouchableOpacity>
                </View>

                {/* Select package type */}
                <Text style={[styles.label, { color: isDarkTheme && "#fff" }]}>{words.PackageType}</Text>
                <View style={styles.packageTypeContainer}>
                    <TouchableOpacity style={[styles.packageOption, packageType === 'Small' && styles.selectedPackage]} onPress={() => handlePackageTypeSelect('Small')}>
                        <Ionicons name="cube-outline" size={30} color={packageType === 'Small' ? '#fff' : '#777'} />
                        <Text numberOfLines={1} style={[styles.packageText, packageType === 'Small' && styles.selectedPackageText]}>{words.Small}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.packageOption, packageType === 'Medium' && styles.selectedPackage]} onPress={() => handlePackageTypeSelect('Medium')}>
                        <Ionicons name="layers-outline" size={30} color={packageType === 'Medium' ? '#fff' : '#777'} />
                        <Text numberOfLines={1} style={[styles.packageText, packageType === 'Medium' && styles.selectedPackageText]}>{words.Medium}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.packageOption, packageType === 'Large' && styles.selectedPackage]} onPress={() => handlePackageTypeSelect('Large')}>
                        <Ionicons name="gift-outline" size={30} color={packageType === 'Large' ? '#fff' : '#27AE60'} />
                        <Text numberOfLines={1} style={[styles.packageText, packageType === 'Large' && styles.selectedPackageText]}>{words.Large}</Text>
                    </TouchableOpacity>
                </View>

                {/* Select delivery type */}
                <Text style={[styles.label, { color: isDarkTheme && "#fff" }]}>{words.DeliveryType}</Text>
                <View style={styles.deliveryTypeContainer}>
                    <TouchableOpacity
                        style={[styles.deliveryOption, deliveryType === 'Standard' && styles.selectedDelivery]}
                        onPress={() => handleDeliveryTypeSelect('Standard')}
                    >
                        <Text style={[styles.deliveryText, deliveryType === 'Standard' && styles.selectedDeliveryText]}>{words.Standard}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deliveryOption, deliveryType === 'Express' && styles.selectedDelivery]}
                        onPress={() => handleDeliveryTypeSelect('Express')}
                    >
                        <Text style={[styles.deliveryText, deliveryType === 'Express' && styles.selectedDeliveryText]}>{words.Express}</Text>
                    </TouchableOpacity>
                </View>

                {/* Recipient's contact details */}
                <Text style={[styles.label, { color: isDarkTheme && "#fff" }]}>{words.RecipientDetails}</Text>
                <TextInput
                    style={[styles.input,{color:isDarkTheme && "#fff"}]}
                    placeholder={words.RecipientName}
                    value={recipientName}
                    onChangeText={setRecipientName}
                    placeholderTextColor={isDarkTheme ? "#fff":"#000"}
                />
                <TextInput
                    style={[styles.input,{color:isDarkTheme && "#fff"}]}
                    placeholder={words.PhoneNumber}
                    keyboardType="phone-pad"
                    value={recipientPhone}
                    onChangeText={setRecipientPhone}
                    placeholderTextColor={isDarkTheme ? "#fff":"#000"}

                />
                <TextInput
                    style={[styles.input, styles.notesInput,{color:isDarkTheme && "#fff"}]}
                    placeholder={words.AdditionalNotes}
                    multiline
                    value={additionalNotes}
                    onChangeText={setAdditionalNotes}
                    placeholderTextColor={isDarkTheme ? "#fff":"#000"}

                />

                {/* Fare calculation */}
                <View style={styles.fareContainer}>
                    <Text style={[styles.fareLabel, { color: isDarkTheme && "#fff" }]}>{words.FareCalculation}</Text>
                    <Text style={[styles.fareAmount, { color: isDarkTheme && "#fff" }]}>{fare}</Text>
                </View>

                {/* Payment method */}
                <TouchableOpacity style={[styles.paymentMethodContainer, { color: isDarkTheme && "#fff" }]}>
                    <Text style={[styles.paymentMethodLabel, { color: isDarkTheme && "#fff" }]}>{words.PaymentMethod}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.paymentMethodValue}>{words.Cash}</Text>
                        <Ionicons name="chevron-down-outline" size={20} color="#777" />
                    </View>
                </TouchableOpacity>

                {/* Request delivery button */}
                <TouchableOpacity style={[styles.requestButton,{marginBottom:120}]} onPress={handleRequestDelivery}>
                    <Text style={styles.requestButtonText}>{words.RequestDelivery}</Text>
                </TouchableOpacity>

            </ScrollView>

            <BottomNavbar />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#555',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1e293b',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    iconInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        height: 50,
        borderColor: "#1e293b"

    },
    locationIcon: {
        padding: 10,
    },
    packageTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    packageOption: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        width: 100,
    },
    selectedPackage: {
        backgroundColor: '#27AE60',
    },
    packageText: {
        marginTop: 5,
        fontSize: 14,
        color: '#777',
    },
    selectedPackageText: {
        color: '#fff',
    },
    deliveryTypeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    deliveryOption: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    selectedDelivery: {
        backgroundColor: '#27AE60',
    },
    deliveryText: {
        fontSize: 16,
        color: '#777',
    },
    selectedDeliveryText: {
        color: '#fff',
    },
    notesInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    fareContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    fareLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    fareAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
    },
    paymentMethodLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    paymentMethodValue: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
    },
    requestButton: {
        backgroundColor: '#27AE60',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 50
    },
    requestButtonText: {
        color: '#fff',
    },
});

export default Delivery;