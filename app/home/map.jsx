import { EvilIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import carImg from '../../assets/images/home/car.png';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import { useTheme } from '../../hooks/themeContext';


const darkMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#0F172A' }],
    },
    {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#1E293B' }],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#0F172A' }],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#1E293B' }],
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#2c2c2c' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8a8a8a' }],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#373737' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#3c3c3c' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#0F172A' }],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{ color: '#4e4e4e' }],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
    },
    {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#1E293B' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#3d3d3d' }],
    },
];

const translations = {
    English: {
        orderAccepted: "Your order has been accepted",
        packageShortly: "Your package will get to you shortly.",
        keepTrack: "Keep track",
        packageOnWay: "Your package is on the way",
        trackYourOrder: "Track your order",
        chat: "Chat",
        estimatedDelivery: "Estimated delivery date",
        pickupLocation: "Pickup Location",
        dropoffLocation: "Dropoff Location",
        cancelDelivery: "Cancel delivery",
        orderCancelled: "Order cancelled",
        orderCancelledSubtitle: "Your order has been successfully cancelled.",
        bookAnotherRide: "Book another ride",
        notNow: "Not now",
    },
    Russian: {
        orderAccepted: "Ваш заказ принят",
        packageShortly: "Ваша посылка скоро будет у вас.",
        keepTrack: "Отслеживать",
        packageOnWay: "Ваша посылка в пути",
        trackYourOrder: "Отследить заказ",
        chat: "Чат",
        estimatedDelivery: "Ориентировочное время доставки",
        pickupLocation: "Место получения",
        dropoffLocation: "Место доставки",
        cancelDelivery: "Отменить доставку",
        orderCancelled: "Заказ отменен",
        orderCancelledSubtitle: "Ваш заказ успешно отменен.",
        bookAnotherRide: "Заказать другую поездку",
        notNow: "Не сейчас",
    },
    Ukrainian: {
        orderAccepted: "Ваше замовлення прийнято",
        packageShortly: "Ваша посилка незабаром буде у вас.",
        keepTrack: "Відстежувати",
        packageOnWay: "Ваша посилка в дорозі",
        trackYourOrder: "Відстежити замовлення",
        chat: "Чат",
        estimatedDelivery: "Орієнтовна дата доставки",
        pickupLocation: "Місце отримання",
        dropoffLocation: "Місце доставки",
        cancelDelivery: "Скасувати доставку",
        orderCancelled: "Замовлення скасовано",
        orderCancelledSubtitle: "Ваше замовлення було успішно скасовано.",
        bookAnotherRide: "Замовити іншу поїздку",
        notNow: "Не зараз",
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


const Map = () => {
    const words = useLanguage();
    const mapRef = useRef(null);
    const { isDarkTheme } = useTheme();
    const [userlocation, setUserLocation] = useState(null);
    const [nearByDrivers, setNearByDrivers] = useState([]);
    const [isOrderAcceptedModalVisible, setIsOrderAcceptedModalVisible] = useState(true);
    const [onTheWayVisible, setonTheWayVisible] = useState(false)
    const [trackVisible, setTrackVisible] = useState(false)
    const [tripCancelledModel, setTripCancelledModel] = useState(false);

    const [deliveryDetails] = useState({
        estimatedTime: '19:50 mins',
        pickupLocation: 'Malware Junction',
        dropoffLocation: '23, Round Town Avenue',
    });

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        const generatedDrivers = Array.from({ length: 5 }).map((_, index) => ({
            id: index,
            latitude: location.coords.latitude + (Math.random() * 0.02 - 0.01),
            longitude: location.coords.longitude + (Math.random() * 0.02 - 0.01)
        }));

        setNearByDrivers(generatedDrivers);
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const centerMapOnUser = async () => {
        try {
            mapRef.current.animateToRegion(userlocation, 1000);
        } catch (error) {
            console.error('Error getting location', error);
        }
    };
    return (

        <View style={{ flex: 1, backgroundColor: isDarkTheme ? "#0F172A" : "#fff" }}>


            <View style={{ flex: 1, position: "relative" }}>


                {/* TOPBAR  */}
                <View style={{ position: "absolute", top: 50, left: 0, right: 0, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: 10, paddingHorizontal: 20, zIndex: 100 }}>

                    <TouchableOpacity onPress={() => router.push("/home/search")} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: isDarkTheme ? "#1E293B" : "#fff" }}>
                        <EvilIcons name="search" size={24} color={isDarkTheme ? "#fff" : "black"} style={{ marginTop: -5 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/home/notification")} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: isDarkTheme ? "#1E293B" : "#fff" }}>
                        <EvilIcons name="bell" size={24} color={isDarkTheme ? "#fff" : "black"} style={{ marginTop: -5 }} />
                    </TouchableOpacity>

                </View>


                <TouchableOpacity onPress={centerMapOnUser} style={{ zIndex: 100, position: "absolute", bottom: (!isOrderAcceptedModalVisible && !onTheWayVisible && !trackVisible &&!tripCancelledModel) ? 200 :430, right: 10, width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: isDarkTheme ? "#1E293B" : "#fff" }}>
                    <FontAwesome6 name="location-arrow" size={20} color={!isDarkTheme ? "black" : "#fff"} />
                </TouchableOpacity>

                {/* MAP */}
                {
                    userlocation ?
                        <MapView ref={mapRef} customMapStyle={isDarkTheme && darkMapStyle} style={{ width: '100%', height: '100%' }} region={userlocation || { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation showsMyLocationButton={false}>

                            <Marker coordinate={userlocation || { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={userImg} style={{ width: 40, height: 40 }} />
                                </View>
                            </Marker>

                            {nearByDrivers?.map(driver => (
                                <Marker key={driver.id} coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={carImg} style={{ width: 19, height: 40 }} />
                                    </View>
                                </Marker>
                            ))}
                        </MapView> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: isDarkTheme && "#fff", fontSize: 16 }}>Fetching your location...</Text>
                        </View>
                }

            </View>


            {
                userlocation && (
                    <Modal animationType="slide" transparent={true} visible={isOrderAcceptedModalVisible} onRequestClose={() => setIsOrderAcceptedModalVisible(false)}>
                        <View style={[styles.modalOverlay, { backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }]}>
                            <View style={[styles.modalContainer, { backgroundColor: isDarkTheme ? '#0F172A' : 'white' }]}>
                                <View style={styles.checkIconContainer}>
                                    <View style={styles.checkCircle}>
                                        <Ionicons name="checkmark-sharp" size={60} color="white" />
                                    </View>
                                </View>
                                <Text style={[styles.modalTitle, { color: isDarkTheme && "#fff" }]}>{words.orderAccepted}</Text>
                                <Text style={[styles.modalText, { color: isDarkTheme && "#fff" }]}>{words.packageShortly}</Text>
                                <TouchableOpacity style={styles.keepTrackButton} onPress={() => { setIsOrderAcceptedModalVisible(false); setonTheWayVisible(true) }}>
                                    <Text style={styles.keepTrackText}>{words.keepTrack}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )
            }

            <Modal animationType="slide" transparent={true} visible={onTheWayVisible} onRequestClose={() => setonTheWayVisible(false)}>
                <View style={[styles.modalOverlay, { backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }]}>
                    <View style={[styles.modalContainer, { backgroundColor: isDarkTheme ? '#0F172A' : 'white' }]}>
                        <View style={styles.checkIconContainer}>
                            <View style={styles.checkCircle}>
                                <Ionicons name="checkmark-sharp" size={60} color="white" />
                            </View>
                        </View>
                        <Text style={[styles.modalTitle, { color: isDarkTheme && "#fff" }]}>{words.packageOnWay}</Text>
                        <Text style={[styles.modalText, { color: isDarkTheme && "#fff" }]}>{words.packageShortly}</Text>
                        <TouchableOpacity style={styles.keepTrackButton} onPress={() => { setonTheWayVisible(false); setTrackVisible(true) }}>
                            <Text style={styles.keepTrackText}>{words.keepTrack}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <Modal animationType="slide" transparent={true} visible={trackVisible} onRequestClose={() => setTrackVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>

                        {/* Header */}
                        <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? "#fff" : '#333' }}>{words.trackYourOrder}</Text>
                            <TouchableOpacity onPress={() => { setTrackVisible(false); router.push("/home/chats") }} style={{ backgroundColor: '#e6f9e8', borderRadius: 10, padding: 8 }}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2ECC71" />
                            </TouchableOpacity>
                        </View>

                        {/* */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkTheme ? "#fff" : '#333' }}>{words.estimatedDelivery}</Text>
                                <Text style={{ fontSize: 16, color: isDarkTheme ? "#fff" : '#666' }}>{deliveryDetails.estimatedTime}</Text>
                            </View>
                        </View>

                        {/* */}
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkTheme ? "#fff" : '#333' }}>{words.pickupLocation}</Text>
                            <Text style={{ fontSize: 16, color: isDarkTheme ? "#fff" : '#666' }}>{deliveryDetails.pickupLocation}</Text>
                        </View>

                        {/* */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkTheme ? "#fff" : '#333' }}>{words.dropoffLocation}</Text>
                            <Text style={{ fontSize: 16, color: isDarkTheme ? "#fff" : '#666' }}>{deliveryDetails.dropoffLocation}</Text>
                        </View>


                        <TouchableOpacity onPress={() => { setTrackVisible(false); setTripCancelledModel(true) }} style={{ backgroundColor: '#FF6B6B', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{words.cancelDelivery}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>


            {tripCancelledModel && (
                <Modal visible={tripCancelledModel} animationType="fade" transparent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                        <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', borderRadius: 15, marginHorizontal: 0, padding: 10, alignItems: 'center' }}>

                            <View style={{ backgroundColor: '#FFDDDD', borderRadius: 30, padding: 15, marginBottom: 20, }}>
                                <Ionicons name="close" size={30} color="#FF6B6B" />
                            </View>

                            {/* Title */}
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: isDarkTheme ? "#fff" : '#333', marginBottom: 10 }}>{words.orderCancelled}!</Text>

                            {/* Subtitle */}
                            <Text style={{ fontSize: 16, color: isDarkTheme ? "#fff" : '#777', textAlign: 'center', marginBottom: 25 }}>{words.orderCancelledSubtitle}</Text>

                            {/* Action Buttons */}
                            <TouchableOpacity style={{ width: 300, backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30, marginBottom: 10 }} onPress={() => { setTripCancelledModel(false); router.push("/home/delivery"); }}>
                                <Text style={{ color: 'white', textAlign: "center" }}>{words.bookAnotherRide}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 300, backgroundColor: '#E0F7FA', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30 }} onPress={() => { setTripCancelledModel(false); router.push("/home/rate"); }}>
                                <Text style={{ color: '#00ACC1', textAlign: "center" }}>{words.notNow}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            <BottomNavbar />


        </View>

    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    checkIconContainer: {
        marginBottom: 20,
    },
    checkCircle: {
        backgroundColor: '#2ECC71',
        borderRadius: 75,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    keepTrackButton: {
        backgroundColor: '#3498DB',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    keepTrackText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Map;
// backgroundColor:"rgba(0,0,0,0.4)"
