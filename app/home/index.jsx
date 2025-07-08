import { EvilIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Modal, Platform, ScrollView, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import carImg from '../../assets/images/home/car.png';
import car3Img from '../../assets/images/home/car3.png';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import { useTheme } from '../../hooks/themeContext';

const savedPlaces = [
    { name: 'Fashion Store', address: '45, Jos Avenue 34 Crescent', distance: '11.1km' },
    { name: 'Grocery store', address: '45, Jos Avenue 34 Crescent', distance: '7.4km' },
    { name: 'Events Center', address: '45, Jos Avenue 34 Crescent', distance: '6.0km' },
    { name: 'Crunchies', address: '45, Jos Avenue 34 Crescent', distance: '12.7km' },
];
const cars = [
    { name: 'Toyota Camry', capacity: '2-3 persons', time: "3 Mins", price: '₴1,000' },
    { name: 'Mercedes AMG', capacity: '3-5 persons', time: "3 Mins", price: '₴4,000' },
    { name: 'Lexus RX 350', capacity: '3-5 persons', time: "3 Mins", price: '₴2,500' },
];
const paymentMethods = [
    { name: 'Cash', icon: 'cash' },
    { name: 'Google Pay', icon: 'logo-google' },
    { name: 'Wallet', icon: 'wallet' },
];
const paymentMethods2 = [
    { name: 'Cash', icon: 'cash' },
    { name: 'Apple Pay', icon: 'logo-apple' },
    { name: 'Wallet', icon: 'wallet' },
];

const driverInfo = {
    name: 'Daniel Jack',
    rating: '4.5',
    license: 'AD65GEJKFK',
    eta: '5 mins',
    profileImage: userImg,
};
const reasons = [
    'I want to change details of this journey',
    'The driver took long than expected',
    'Wrong address',
    'I don\'t want the journey',
    'Driver denied coming to pickup',
    'Others',
];

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

const Home = () => {
    const { isDarkTheme } = useTheme();
    const mapRef = useRef(null);
    const [userlocation, setUserLocation] = useState(null);
    const [nearByDrivers, setNearByDrivers] = useState([]);
    const [animatedDrivers, setAnimatedDrivers] = useState([]);
    const [destination, setDestination] = useState({ pickupAddress: "", dropOfAddress: "" });
    const [destinationInput, setDestinationInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showBookingModel, setShowBookingModel] = useState(false);
    const [showDistanceModel, setShowDistanceModel] = useState(false);
    const [showSelectCarModal, setShowSelectCarModal] = useState(false);
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
    const [showProcessingModel, setShowProcessingModel] = useState(false);
    const [showDriverInfo, setShowDriverInfo] = useState(false);
    const [showCancelReasons, setShowCancelReasons] = useState(false);
    const [tripCancelledModel, setTripCancelledModel] = useState(false);
    const [completedModel, setCompletedModel] = useState(false);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash')
    const [selectedCar, setSelectedCar] = useState('Toyota Camry');
    const [selectedReason, setSelectedReason] = useState('I want to change details of this journey');
    const [otherReasonText, setOtherReasonText] = useState('');


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [stopModel, setStopModel] = useState(false);
    const [confirmStop, setConfirmStop] = useState(false);

    const [loading, setloading] = useState(true)

    const userLocation = async () => {
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

    const handlePlaceSelection = async (data, details) => {
        if (details) {
            const { lat, lng } = details?.geometry?.location;
            const reverseGeocode = await Location.reverseGeocodeAsync({ latitude: userlocation.latitude, longitude: userlocation.longitude, });
            // await AsyncStorage.setItem('dropoffLocation', JSON.stringify({ pickupLocation: { type: "Point", coordinates: [lng, lat] }, }))
            // await AsyncStorage.setItem('pickupLocation', JSON.stringify({ pickupLocation: { type: "Point", coordinates: [mapRegion.longitude, mapRegion.latitude] }, }))
            // await AsyncStorage.setItem('pickupLongitude', String(mapRegion.longitude));
            // await AsyncStorage.setItem('pickupLatitude', String(mapRegion.latitude));

            // await AsyncStorage.setItem('dropoffLongitude', String(lng));
            // await AsyncStorage.setItem('dropoffLatitude', String(lat));
            // await AsyncStorage.setItem('dropoffAddress', data.description)
            // await AsyncStorage.setItem('pickupAddress', reverseGeocode[0].formattedAddress)
            setDestination({ pickupAddress: reverseGeocode[0].formattedAddress, dropOfAddress: data.description?.replaceAll(",", " ") })
            setShowBookingModel(false)
            setShowDistanceModel(true)
            setSuggestions([])
            // router.push("/rider/home/location")

        }
        else {
            console.log('data not found')
        }
    };

    const handleSuggestionSelect = async (item) => {
        try {
            const detailsRes = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=AIzaSyDo4GPTF9dChnFkV-uX5zoiA7JHZongxPI`);
            const details = await detailsRes.json();

            if (details.status === 'OK') {
                handlePlaceSelection(item, details.result);
                setSuggestions([])
            }
            else {
                setSuggestions([])
                console.warn("Place details error:", details.status);
            }
        } catch (err) {
            console.error("Error getting place details:", err);
        }
    };

    const fetchSuggestions = async (inputText) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&key=AIzaSyDo4GPTF9dChnFkV-uX5zoiA7JHZongxPI&language=en`);
            const json = await response.json();
            if (json.status === "OK") {
                setSuggestions(json.predictions);
            } else {
                console.warn("Google API error:", json.status);
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    useEffect(() => {
        userLocation();
        setTimeout(() => {
            setloading(false)
        }, 3000);
    }, []);


    useEffect(() => {
        const initializedDrivers = nearByDrivers.map(driver => {
            return {
                ...driver,
                coordinate: new AnimatedRegion({
                    latitude: driver.latitude,
                    longitude: driver.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }),
            };
        });
        setAnimatedDrivers(initializedDrivers);
    }, []);

    useEffect(() => {
        nearByDrivers.forEach(updatedDriver => {
            const animDriver = animatedDrivers.find(d => d.id === updatedDriver.id);
            if (animDriver) {
                animDriver.coordinate.timing({
                    latitude: updatedDriver.latitude,
                    longitude: updatedDriver.longitude,
                    duration: 500,
                    useNativeDriver: false,
                }).start();
            }
        });
    }, [nearByDrivers]);


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

                {/* MAP */}

                {
                    userlocation ? (
                        <MapView ref={mapRef} optimizeForPerformance={true} initialRegion={userlocation || { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }} customMapStyle={isDarkTheme && darkMapStyle} style={{ width: '100%', height: '100%' }} region={userlocation || { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation showsMyLocationButton={false}>

                            <Marker coordinate={userlocation || { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={userImg} style={{ width: 40, height: 40, zIndex: 100 }} resizeMode="contain" />
                                </View>
                            </Marker>


                            {nearByDrivers?.map(driver => (
                                <Marker anchor={{ x: 0.5, y: 1 }} key={driver.id} coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={carImg} style={{ width: 19, height: 40, zIndex: 100 }} resizeMode="contain" />
                                    </View>
                                </Marker>
                            ))}

                        </MapView>
                    )
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: isDarkTheme && "#fff", fontSize: 16 }}>Fetching your location...</Text>
                        </View>
                }

                {/* BOOKRIDE BUTTON  */}

                <View style={{ position: "absolute", bottom: 100, left: 0, right: 0, margin: 20 }}>

                    <TouchableOpacity onPress={() => setShowBookingModel(!showBookingModel)} style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10, backgroundColor: "#2ECC71" }}>
                        <Text style={{ color: "#fff" }}>Book Ride</Text>
                    </TouchableOpacity>

                </View>

            </View>


            {/* MAP CENTERING  */}

            <TouchableOpacity onPress={centerMapOnUser} style={{ position: "absolute", bottom: (showBookingModel || showSelectCarModal || showPaymentMethodModal || showProcessingModel || showDriverInfo || showCancelReasons || tripCancelledModel || completedModel || stopModel || confirmStop) ? 430 : 200, right: 10, width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: isDarkTheme ? "#1E293B" : "#fff" }}>
                <FontAwesome6 name="location-arrow" size={20} color={!isDarkTheme ? "black" : "#fff"} />
            </TouchableOpacity>


            {/* FIRST STEP  */}

            {
                showBookingModel && (
                    <Modal visible={showBookingModel} animationType="slide" transparent={true}>
                        <TouchableWithoutFeedback onPress={() => setShowBookingModel(!showBookingModel)}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                                <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%' }}>

                                    <FlatList
                                        ListHeaderComponent={
                                            <>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: isDarkTheme ? "#fff" : '#333' }}>Where are you going today?</Text>

                                                {/* Current Location Input */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDarkTheme ? '#334155' : '#f2f2f2', borderRadius: 10, paddingHorizontal: 15, marginBottom: 10 }}>
                                                    <Ionicons name="location" size={20} color="#888" />
                                                    <TextInput
                                                        style={{ flex: 1, height: 45, marginLeft: 10, color: isDarkTheme ? '#fff' : '#555' }}
                                                        placeholder="Current Location"
                                                        placeholderTextColor={isDarkTheme?"#fff":"#000"}
                                                        value={userLocation}
                                                        editable={false}
                                                    />
                                                    <TouchableOpacity style={{ padding: 8 }}>
                                                        <Ionicons name="locate-outline" size={20} color="#2ECC71" />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'column', backgroundColor: isDarkTheme ? '#334155' : '#f2f2f2', borderRadius: 10, paddingHorizontal: 15, marginBottom: 20 }}>

                                                    <TextInput
                                                        placeholder="Destination"
                                                        value={destinationInput}
                                                        placeholderTextColor={isDarkTheme?"#fff":"#000"}
                                                        onChangeText={(text) => {
                                                            setDestinationInput(text);
                                                            fetchSuggestions(text);
                                                        }}
                                                        style={{ height: 45, color: isDarkTheme ? '#fff' : '#555' }}
                                                    />

                                                    {/* Suggestions List */}
                                                    {suggestions.length > 0 && (
                                                        <FlatList
                                                            data={suggestions}
                                                            keyExtractor={(item) => item.place_id}
                                                            renderItem={({ item }) => (
                                                                <TouchableOpacity
                                                                    onPress={() => handleSuggestionSelect(item)}
                                                                    style={{ paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                                                                >
                                                                    <Text style={{ color: isDarkTheme ? '#fff' : '#555' }}>{item.description}</Text>
                                                                </TouchableOpacity>
                                                            )}
                                                        />
                                                    )}
                                                </View>


                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>Share ride</Text>
                                                    <Switch
                                                        trackColor={{ false: '#dadada', true: '#2ECC71' }}
                                                        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={toggleSwitch}
                                                        value={isEnabled}
                                                    />
                                                </View>


                                                {/* Saved Places Title */}
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>Saved places</Text>
                                                    <TouchableOpacity>
                                                        <Ionicons name="chevron-forward" size={20} color="#888" />
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                        }
                                        data={savedPlaces}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                                <View style={{ backgroundColor: '#f9f9f9', borderRadius: 8, padding: 8, marginRight: 15 }}>
                                                    <Ionicons name="time-outline" size={18} color="#888" />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>{item.name}</Text>
                                                    <Text style={{ color: '#777', fontSize: 12 }}>{item.address}</Text>
                                                </View>
                                                <Text style={{ color: '#777', fontSize: 12 }}>{item.distance}</Text>
                                            </TouchableOpacity>
                                        )}
                                        contentContainerStyle={{ padding: 20 }}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
                                    />

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }


            {
                showDistanceModel && (
                    <Modal visible={showDistanceModel} animationType="slide" transparent={true}>
                        <TouchableWithoutFeedback onPress={() => setShowDistanceModel(false)}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                                <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? '#fff' : '#555' }}>Distance</Text>
                                        <Text style={{ fontSize: 16, color: '#777' }}>11.5km</Text>
                                    </View>

                                    {/* Pickup Location */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                                        <View style={{ backgroundColor: '#e6f9e8', borderRadius: 10, padding: 8, marginRight: 15 }}>
                                            <Ionicons name="location" size={20} color="#2ECC71" />
                                        </View>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>Fashion Store</Text>
                                            <Text style={{ color: '#777', fontSize: 12 }}>45, Jos Avenue 34 Crescent</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Ionicons name="checkmark-sharp" size={24} color="#2ECC71" />
                                        </View>
                                    </View>

                                    {/* Dropoff Location */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <View style={{ backgroundColor: '#e6f9e8', borderRadius: 10, padding: 8, marginRight: 15 }}>
                                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' }} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>Home</Text>
                                            <Text style={{ color: '#777', fontSize: 12 }}>45, Jos Avenue 34 Crescent</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Ionicons name="checkmark-sharp" size={24} color="#2ECC71" />
                                        </View>
                                    </View>

                                    {/* Continue Button */}
                                    <TouchableOpacity onPress={() => { setShowDistanceModel(false); setShowSelectCarModal(!showSelectCarModal) }} style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }

            {
                showSelectCarModal && (
                    <Modal visible={showSelectCarModal} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                            <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>

                                {/* Header */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => { setShowSelectCarModal(false); setShowDistanceModel(true) }} style={{ marginRight: 15 }}>
                                        <Ionicons name="chevron-back" size={24} color="#888" />
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? '#fff' : '#555' }}>Select car</Text>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
                                    <TouchableOpacity style={{ borderBottomWidth: 5, borderBottomColor: isDarkTheme ? "#fff" : "#2ECC71", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                        <Text style={{ color: isDarkTheme ? "#fff" : "#2ECC71", }}>Economy</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text style={{ color: "#94A3B8", }}>Comfort</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text style={{ color: "#94A3B8", }}>Premium</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text style={{ color: "#94A3B8", }}>Business</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text style={{ color: "#94A3B8", }}>Others</Text>
                                    </TouchableOpacity>

                                </ScrollView>

                                {/* Car List */}
                                <ScrollView contentContainerStyle={{ marginTop: 20 }}>
                                    {cars.map((car, index) => (
                                        <TouchableOpacity key={index} style={{ borderWidth: 1, borderColor: isDarkTheme ? "#334155" : "#2ECC71", flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }} onPress={() => setSelectedCar(car.name)}>
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <Image source={car3Img} />
                                                <View>
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>{car.name}</Text>
                                                    <Text style={{ color: '#777', fontSize: 12, marginTop: 2 }}>{car.capacity} | {car.time}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: isDarkTheme ? '#fff' : '#555', fontWeight: 'bold', marginRight: 15 }}>{car.price}</Text>
                                                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', backgroundColor: selectedCar === car.name ? '#2ECC71' : 'transparent', }}>
                                                    {selectedCar === car.name && <Ionicons name="checkmark" size={14} color="white" />}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                {/* Payment Options */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555', marginRight: 5 }}>Cash</Text>
                                        <Ionicons name="chevron-forward" size={18} color="#888" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="pricetag-outline" size={18} color="#2ECC71" />
                                        <Text style={{ color: '#2ECC71', marginLeft: 5 }}>Discount</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Book Car Button */}
                                <TouchableOpacity onPress={() => { setShowSelectCarModal(false); setShowPaymentMethodModal(true) }} style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Book car ({cars.find(car => car.name === selectedCar)?.price})</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setShowSelectCarModal(false); ToastAndroid.show("Ride Pre Booked", ToastAndroid.SHORT) }} style={{ borderWidth: 1, borderColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ color: '#2ECC71', fontWeight: 'bold', fontSize: 16 }}>Pre Book Ride</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                )
            }

            {
                showPaymentMethodModal && (
                    <Modal visible={showPaymentMethodModal} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                            <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <TouchableOpacity onPress={() => { setShowPaymentMethodModal(false); setShowSelectCarModal(true) }} style={{ marginRight: 15 }}>
                                        <Ionicons name="chevron-back" size={24} color="#888" />
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? '#fff' : '#555' }}>Payment methods</Text>
                                </View>

                                {
                                    Platform.OS === "android" ?

                                        paymentMethods.map((method, index) => (
                                            <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between', }} onPress={() => setSelectedPaymentMethod(method.name)}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name={method.icon} size={24} color={isDarkTheme ? "#fff" : "#333"} style={{ marginRight: 15 }} />
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>{method.name}</Text>
                                                </View>
                                                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', backgroundColor: selectedPaymentMethod === method.name ? '#2ECC71' : 'transparent', }}>
                                                    {selectedPaymentMethod === method.name && <Ionicons name="checkmark" size={14} color="white" />}
                                                </View>
                                            </TouchableOpacity>
                                        ))

                                        :

                                        paymentMethods2.map((method, index) => (
                                            <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between', }} onPress={() => setSelectedPaymentMethod(method.name)}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons name={method.icon} size={24} color="#333" style={{ marginRight: 15 }} />
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>{method.name}</Text>
                                                </View>
                                                <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', backgroundColor: selectedPaymentMethod === method.name ? '#2ECC71' : 'transparent', }}>
                                                    {selectedPaymentMethod === method.name && <Ionicons name="checkmark" size={14} color="white" />}
                                                </View>
                                            </TouchableOpacity>
                                        ))


                                }

                                {/* Payment Method List */}

                                <TouchableOpacity style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 20 }} onPress={() => { setShowPaymentMethodModal(false); setShowProcessingModel(true) }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                )
            }

            {
                showProcessingModel && (
                    <Modal visible={showProcessingModel} animationType="slide" transparent={true}>
                        <TouchableWithoutFeedback>
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                                <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>



                                    <View style={{ justifyContent: "center", alignItems: "center" }}>

                                        <Image source={userImg} style={{ width: 50, height: 50 }} />

                                        <View style={{ marginVertical: 10, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? '#fff' : '#555' }}>Booking ride...</Text>
                                            <Text style={{ color: '#777', marginTop: 5 }}>This may take few seconds</Text>
                                        </View>



                                    </View>

                                    <TouchableOpacity onPress={() => { setShowProcessingModel(false); setShowDriverInfo(true) }} style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 16 }}>Book Car {selectedCar}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }

            {
                showDriverInfo && (
                    <Modal visible={showDriverInfo} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                            <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>

                                {/* Header */}
                                <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? '#fff' : '#555' }}>Driver is arriving...</Text>
                                    <Text style={{ color: '#777' }}>{driverInfo.eta}</Text>
                                </View>


                                {/* Driver Info */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <Image source={driverInfo.profileImage} style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: isDarkTheme ? '#fff' : '#555' }}>{driverInfo.name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="star" size={16} color="#FFC107" style={{ marginRight: 5 }} />
                                            <Text style={{ color: '#777', marginRight: 5 }}>{driverInfo.rating}</Text>
                                            <Text style={{ color: '#777' }}>| {driverInfo.license}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { setShowDriverInfo(false); router.push("/home/chats") }} style={{ backgroundColor: '#e6f9e8', borderRadius: 10, padding: 8 }}>
                                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2ECC71" />
                                    </TouchableOpacity>
                                </View>



                                {/* Action Buttons */}
                                <TouchableOpacity onPress={() => { setShowDriverInfo(false); setCompletedModel(true) }} style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>End ride</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setShowDriverInfo(false); setStopModel(!stopModel) }} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: "#2ECC71", borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ color: '#2ECC71', fontWeight: 'bold', fontSize: 16 }}>Add Stop</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setShowDriverInfo(false); setShowCancelReasons(true) }} style={{ backgroundColor: '#FF6B6B', borderRadius: 10, paddingVertical: 15, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                )
            }

            {
                showCancelReasons && (
                    <Modal visible={showCancelReasons} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                            <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                                {/* Header */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <TouchableOpacity onPress={() => { setShowCancelReasons(false); setShowDistanceModel(true) }} style={{ marginRight: 15 }}>
                                        <Ionicons name="chevron-back" size={24} color="#888" />
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkTheme ? '#fff' : '#555' }}>Cancel trip</Text>
                                </View>

                                {/* Instructions */}
                                <Text style={{ fontSize: 16, color: isDarkTheme ? '#fff' : '#555', marginBottom: 15 }}>Please select reason for trip cancellation</Text>

                                {/* Cancellation Reasons */}
                                <ScrollView>
                                    {reasons.map((reason, index) => (
                                        <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }} onPress={() => setSelectedReason(reason)}>
                                            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', marginRight: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: selectedReason === reason ? '#2ECC71' : 'transparent', }}>
                                                {selectedReason === reason && <Ionicons name="checkmark" size={16} color="white" />}
                                            </View>
                                            <Text style={{ color: isDarkTheme ? '#fff' : '#555' }}>{reason}</Text>
                                        </TouchableOpacity>
                                    ))}

                                    {/* Other Reasons Input */}
                                    {selectedReason === 'Others' && (
                                        <TextInput style={{ height: 80, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 15, textAlignVertical: 'top', color: isDarkTheme ? '#fff' : '#555', }} placeholder="Other reasons" value={otherReasonText} onChangeText={setOtherReasonText} multiline />
                                    )}
                                </ScrollView>

                                {/* Send Button */}
                                <TouchableOpacity style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 20 }} onPress={() => { setShowCancelReasons(false); setTripCancelledModel(true); }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )
            }

            {
                tripCancelledModel && (
                    <Modal visible={tripCancelledModel} animationType="fade" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                            <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', borderRadius: 15, marginHorizontal: 0, padding: 10, alignItems: 'center' }}>

                                <View style={{ backgroundColor: '#FFDDDD', borderRadius: 30, padding: 15, marginBottom: 20, }}>
                                    <Ionicons name="close" size={30} color="#FF6B6B" />
                                </View>

                                {/* Title */}
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: isDarkTheme ? '#fff' : '#555', marginBottom: 10 }}>Trip cancelled!</Text>

                                {/* Subtitle */}
                                <Text style={{ fontSize: 16, color: '#777', textAlign: 'center', marginBottom: 25 }}>
                                    Your ride has been successfully cancelled.
                                </Text>

                                {/* Action Buttons */}
                                <TouchableOpacity style={{ width: 300, backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30, marginBottom: 10 }} onPress={() => { setTripCancelledModel(false); }}>
                                    <Text style={{ color: 'white', textAlign: "center" }}>Book another ride</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: 300, backgroundColor: '#E0F7FA', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30 }} onPress={() => { setTripCancelledModel(false); console.log('Not now'); }}>
                                    <Text style={{ color: '#00ACC1', textAlign: "center" }}>Not now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )
            }


            {
                completedModel && (
                    <Modal visible={completedModel} animationType="fade" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>

                            <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', borderRadius: 15, marginHorizontal: 0, padding: 10, alignItems: 'center' }}>

                                <View style={{ backgroundColor: '#2ECC71', borderRadius: 30, padding: 15, marginBottom: 20, }}>
                                    <Text>✅</Text>
                                </View>

                                {/* Title */}
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: isDarkTheme ? '#fff' : '#555', marginBottom: 10 }}>You’ve arrived! 🎉</Text>

                                {/* Subtitle */}
                                <Text style={{ fontSize: 16, color: '#777', textAlign: 'center', marginBottom: 25 }}>Thanks for riding with us. Don’t forget to rate your driver!</Text>

                                {/* Action Buttons */}
                                <TouchableOpacity style={{ width: 300, backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30, marginBottom: 10 }} onPress={() => { setCompletedModel(false); router.push("/home/rate"); }}>
                                    <Text style={{ color: 'white', textAlign: "center" }}>Rate driver</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: 300, backgroundColor: '#E0F7FA', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 30 }} onPress={() => { setCompletedModel(false); }}>
                                    <Text style={{ color: '#00ACC1', textAlign: "center" }}>Not now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )
            }

            {
                stopModel && (
                    <Modal visible={stopModel} animationType="slide" transparent={true}>
                        <TouchableWithoutFeedback >
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: isDarkTheme && "rgba(0,0,0,0.5)" }}>
                                <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%' }}>

                                    <FlatList
                                        ListHeaderComponent={
                                            <>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: isDarkTheme ? '#fff' : '#555' }}>Add a stop</Text>

                                                {/* Current Location Input */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDarkTheme ? '#334155' : '#f2f2f2', borderRadius: 10, paddingHorizontal: 15, marginBottom: 10 }}>
                                                    <Ionicons name="location" size={20} color="#888" />
                                                    <TextInput
                                                        style={{ flex: 1, height: 45, marginLeft: 10, color: isDarkTheme ? '#fff' : '#555' }}
                                                        placeholder="Current Location"
                                                        placeholderTextColor={isDarkTheme?"#fff":"#000"}
                                                        value={userLocation}
                                                        editable={false}
                                                    />
                                                    <TouchableOpacity style={{ padding: 8 }}>
                                                        <Ionicons name="locate-outline" size={20} color="#2ECC71" />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{ flexDirection: 'column', backgroundColor: isDarkTheme ? '#334155' : '#f2f2f2', borderRadius: 10, paddingHorizontal: 15, marginBottom: 20 }}>

                                                    <TextInput
                                                        placeholder="Destination"
                                                        placeholderTextColor={isDarkTheme?"#fff":"#000"}
                                                        value={destinationInput}
                                                        onChangeText={(text) => {
                                                            setDestinationInput(text);
                                                            fetchSuggestions(text);
                                                        }}
                                                        style={{ height: 45, color: isDarkTheme ? '#fff' : '#555' }}
                                                    />

                                                    {/* Suggestions List */}
                                                    {suggestions.length > 0 && (
                                                        <FlatList
                                                            data={suggestions}
                                                            keyExtractor={(item) => item.place_id}
                                                            renderItem={({ item }) => (
                                                                <TouchableOpacity
                                                                    onPress={() => setSuggestions([])}
                                                                    style={{ paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                                                                >
                                                                    <Text style={{ color: isDarkTheme ? '#fff' : '#555' }}>{item.description}</Text>
                                                                </TouchableOpacity>
                                                            )}
                                                        />
                                                    )}
                                                </View>


                                                {/* Saved Places Title */}
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                    <Text style={{ fontWeight: 'bold', color: isDarkTheme ? '#fff' : '#555' }}>Saved places</Text>
                                                    <TouchableOpacity>
                                                        <Ionicons name="chevron-forward" size={20} color="#888" />
                                                    </TouchableOpacity>
                                                </View>


                                                {/* Action Buttons */}
                                                <TouchableOpacity onPress={() => { setStopModel(!stopModel); setConfirmStop(true) }} style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginBottom: 10 }}>
                                                    <Text style={{ color: 'white', fontSize: 16 }}>View updated fare and time</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => { setShowDriverInfo(true); setStopModel(!stopModel); }} style={{ backgroundColor: '#FF6B6B', borderRadius: 10, paddingVertical: 15, alignItems: 'center' }}>
                                                    <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </>
                                        }
                                        contentContainerStyle={{ padding: 20 }}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
                                    />

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }

            {
                confirmStop && (
                    <Modal visible={confirmStop} animationType="slide" transparent={true}>
                        <TouchableWithoutFeedback >
                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <View style={{ backgroundColor: isDarkTheme ? '#0F172A' : 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%' }}>

                                    <FlatList
                                        ListHeaderComponent={
                                            <>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: isDarkTheme ? '#fff' : '#555' }}>Confirm your stop</Text>

                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                                    <Text style={{ color: "#94A3B8" }}>Estimated time</Text>
                                                    <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>10 mins</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                                    <Text style={{ color: "#94A3B8" }}>Additional fare</Text>
                                                    <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>$250</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                                    <Text style={{ color: "#94A3B8" }}>Total fare</Text>
                                                    <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>$650</Text>
                                                </View>

                                                {/* Action Buttons */}
                                                <TouchableOpacity onPress={() => { setShowDriverInfo(true); setConfirmStop(false) }} style={{ backgroundColor: '#2ECC71', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginBottom: 10 }}>
                                                    <Text style={{ color: 'white', fontSize: 16 }}>Confirm stop</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => { setShowDriverInfo(true); setConfirmStop(false); }} style={{ backgroundColor: '#FF6B6B', borderRadius: 10, paddingVertical: 15, alignItems: 'center' }}>
                                                    <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </>
                                        }
                                        contentContainerStyle={{ padding: 20 }}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
                                    />

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }


            <BottomNavbar />

        </View >

    )
}

export default Home
