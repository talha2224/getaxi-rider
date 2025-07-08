import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import { useTheme } from '../../hooks/themeContext';


const translations = {
  English: {
    Bookings: "Bookings",
    Search: "Search",
    Ride: "Ride",
    Delivery: "Delivery",
    Active: "Active",
    Completed: "Completed",
    Cancelled: "Cancelled",
    DanielJack: "Daniel Jack",
    BookingID: "AD65GEJKFK",
    Amount: "₴ 40.67",
    FashionStore: "Fashion Store",
    Address1: "45, Jos Avenue 34 Crescent",
    Home: "Home",
    Address2: "45, Jos Avenue 34 Crescent",
    Distance: "5.7 Km",
    Date: "5 March, 2025",
    Time: "10 mins",
    Expand: "Expand",
    Prebooked:"Prebooked"
  },
  Russian: {
    Bookings: "Заказы",
    Search: "Поиск",
    Ride: "Поездка",
    Delivery: "Доставка",
    Active: "Активные",
    Completed: "Завершенные",
    Cancelled: "Отмененные",
    DanielJack: "Даниель Джек",
    BookingID: "AD65GEJKFK",
    Amount: "₴ 40.67",
    FashionStore: "Магазин одежды",
    Address1: "45, Jos Avenue 34 Crescent",
    Home: "Дом",
    Address2: "45, Jos Avenue 34 Crescent",
    Distance: "5.7 Км",
    Date: "5 марта, 2025",
    Time: "10 мин",
    Expand: "Развернуть",
    Prebooked:"Prebooked"
  },
  Ukrainian: {
    Bookings: "Замовлення",
    Search: "Пошук",
    Ride: "Поїздка",
    Delivery: "Доставка",
    Active: "Активні",
    Completed: "Завершен",
    Cancelled: "Скасовані",
    DanielJack: "Даніель Джек",
    BookingID: "AD65GEJKFK",
    Amount: "₴ 40.67",
    FashionStore: "Магазин одягу",
    Address1: "45, Jos Avenue 34 Crescent",
    Home: "Дім",
    Address2: "45, Jos Avenue 34 Crescent",
    Distance: "5.7 Км",
    Date: "5 березня, 2025",
    Time: "10 хв",
    Expand: "Розгорнути",
    Prebooked:"Prebooked"
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




const Bookings = () => {
  const { isDarkTheme } = useTheme();
  const [selectedService, setSelectedService] = useState('Ride');
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const words = useLanguage();

  const colors = {
    background: isDarkTheme ? '#0F172A' : '#fff',
    card: isDarkTheme ? '#1E293B' : '#fff',
    textPrimary: isDarkTheme ? '#fff' : '#000',
    textSecondary: isDarkTheme ? '#ccc' : '#777',
    border: isDarkTheme ? '#1E293B' : '#eee',
    toggleBg: isDarkTheme ? '#1E293B' : '#f0f0f0',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{words.Bookings}</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Ride/Delivery Toggle */}
      <View style={[styles.toggleGroup, { backgroundColor: colors.toggleBg }]}>
        {['Ride', 'Delivery'].map(service => (
          <TouchableOpacity
            key={service}
            style={[
              styles.toggleButton,
              selectedService === service && styles.toggleActive,
              selectedService === service && { backgroundColor: colors.card },
            ]}
            onPress={() => setSelectedService(service)}
          >
            <Text numberOfLines={1}
              style={[
                styles.toggleText,
                { color: colors.textSecondary },
                selectedService === service && styles.toggleActiveText,
              ]}
            >
              {words[service]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Status Toggle */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.toggleGroup, { backgroundColor: 'transparent' }]}>
        {['Active', 'Completed', 'Cancelled','Prebooked'].map((status, ind) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusToggleButton,
              { backgroundColor: colors.toggleBg },
              selectedStatus === status && styles.statusToggleActive,
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text numberOfLines={1} ellipsizeMode="tail"
              style={[
                styles.statusToggleText,
                { color: colors.textSecondary },
                selectedStatus === status && styles.statusToggleActiveText,
              ]}
            >
              {words[status]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Booking Card */}
      <View style={[styles.bookingCard, { backgroundColor: colors.card }]}>
        <View style={styles.userInfo}>
          <Image source={userImg} style={styles.userImage} />
          <View>
            <Text style={[styles.userName, { color: colors.textPrimary }]}>{words.DanielJack}</Text>
            <Text style={[styles.userId, { color: colors.textSecondary }]}>{words.BookingID}</Text>
          </View>
          <Text style={[styles.bookingAmount, { color: colors.textPrimary }]}>{words.Amount}</Text>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.locationPoint}>
            <View style={[styles.circle, styles.startCircle]} />
            <Text style={[styles.locationName, { color: colors.textPrimary }]}>{words.FashionStore}</Text>
            <Text style={[styles.locationAddress, { color: colors.textSecondary }]}>{words.Address1}</Text>
          </View>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <View style={styles.locationPoint}>
            <View style={[styles.circle, styles.endCircle]} />
            <Text style={[styles.locationName, { color: colors.textPrimary }]}>{words.Home}</Text>
            <Text style={[styles.locationAddress, { color: colors.textSecondary }]}>{words.Address2}</Text>
          </View>
        </View>

        <View style={[styles.additionalInfo, { borderTopColor: colors.border }]}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}> {words.Distance}</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="calendar" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}> {words.Date}</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="clock" size={16} color={colors.textSecondary} />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}> {words.Time}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/home/receipt")} style={{ backgroundColor: "#2ECC71", height: 40, borderRadius: 10, marginTop: 10, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>Generate E-receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.expandButton, { borderTopColor: colors.border }]}>
          <Ionicons name="chevron-down-outline" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <BottomNavbar />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  toggleGroup: {
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 15,
    padding: 5,
    maxHeight:50
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  toggleActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontWeight: '500',
  },
  toggleActiveText: {
    color: '#27AE60',
    fontWeight: 'bold',
  },
  statusToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
    width:100
  },
  statusToggleActive: {
    backgroundColor: '#27AE60',
  },
  statusToggleText: {},
  statusToggleActiveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookingCard: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userId: {
    fontSize: 12,
  },
  bookingAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 'auto',
  },
  tripDetails: {
    marginBottom: 15,
  },
  locationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  startCircle: {
    backgroundColor: '#27AE60',
  },
  endCircle: {
    backgroundColor: '#27AE60',
  },
  locationName: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  locationAddress: {
    fontSize: 12,
    marginLeft: 22,
  },
  line: {
    width: 1,
    position: 'absolute',
    top: 18,
    left: 5,
    bottom: 18,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    fontSize: 12,
  },
  expandButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
});

export default Bookings;
