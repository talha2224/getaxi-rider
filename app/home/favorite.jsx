import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';


const translations = {
  English: {
    FavoriteLocation: "Favorite locations",
    Home: "Home",
    Office: "Office",
    Store: "Store",
    AddNewLocation: "Add new location",
  },
  Russian: {
    FavoriteLocation: "Избранные места",
    Home: "Дом",
    Office: "Офис",
    Store: "Магазин",
    AddNewLocation: "Добавить новое место",
  },
  Ukrainian: {
    FavoriteLocation: "Улюблені місця",
    Home: "Дім",
    Office: "Офіс",
    Store: "Магазин",
    AddNewLocation: "Додати нове місцезнаходження",
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



const Favorite = () => {
  const { isDarkTheme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState('home'); // id values are lowercase
  const words = useLanguage();

  const favoriteLocationsData = [
    { id: 'home', nameKey: 'Home', address: '364 Stillwater, Ave, Malborne' },
    { id: 'office', nameKey: 'Office', address: '55, Summerhouse, FL 32703' },
    { id: 'store', nameKey: 'Store', address: 'Hollywood, United Ave 345' },
  ];

  const handleSelectLocation = (id) => {
    setSelectedLocation(id);
  };

  const handleAddNewLocation = () => {
    console.log('Add new location pressed');
    router.back();
  };

  // Theme-based colors
  const colors = {
    background: isDarkTheme ? '#0F172A' : '#fff',
    textPrimary: isDarkTheme ? '#fff' : '#000',
    textSecondary: isDarkTheme ? '#bbb' : '#777',
    border: isDarkTheme ? '#334155' : '#eee',
    locationSelectedBg: isDarkTheme ? '#1e293b' : '#f9f9f9',
    radioBorder: isDarkTheme ? '#888' : '#ccc',
    iconBackground: '#27AE60',
    iconColor: isDarkTheme ? '#fff' : '#fff',
    checkmarkColor: '#27AE60',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{words.FavoriteLocation}</Text>
      </View>

      {/* Favorite Location List */}
      {favoriteLocationsData.map((location) => (
        <TouchableOpacity
          key={location.id}
          style={[
            styles.locationItem,
            { borderBottomColor: colors.border },
            selectedLocation === location.id && { backgroundColor: colors.locationSelectedBg },
          ]}
          onPress={() => handleSelectLocation(location.id)}
        >
          <View style={[styles.locationIcon, { backgroundColor: colors.iconBackground }]}>
            <Ionicons name="location-sharp" size={24} color={colors.iconColor} />
          </View>
          <View style={styles.locationDetails}>
            <Text style={[styles.locationName, { color: colors.textPrimary }]}>{words[location.nameKey]}</Text>
            <Text style={[styles.locationAddress, { color: colors.textSecondary }]}>{location.address}</Text>
          </View>
          {selectedLocation === location.id ? (
            <Ionicons name="checkmark-circle-sharp" size={24} color={colors.checkmarkColor} />
          ) : (
            <View style={[styles.radioOuter, { borderColor: colors.radioBorder }]}>
              <View style={styles.radioInner} />
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* Add New Location Button */}
      <TouchableOpacity style={styles.addLocationButton} onPress={handleAddNewLocation}>
        <Text style={styles.addLocationText}>{words.AddNewLocation}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
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
  addLocationButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  addLocationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Favorite;
