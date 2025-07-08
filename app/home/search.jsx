import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';

const translations = {
  English: {
    Search: "Search",
    RecentSearch: "Recent search",
    Clear: "Clear",
  },
  Russian: {
    Search: "Поиск",
    RecentSearch: "Недавний поиск",
    Clear: "Очистить",
  },
  Ukrainian: {
    Search: "Пошук",
    RecentSearch: "Нещодавній пошук",
    Clear: "Очистити",
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


const SearchScreen = () => {
  const words = useLanguage();
  const { isDarkTheme } = useTheme();
  const textColor = isDarkTheme ? '#fff' : '#333';
  const inputBackgroundColor = isDarkTheme ? '#1E293B' : '#f2f2f2';
  const inputTextColor = isDarkTheme ? '#e2e8f0' : '#555';
  const iconColor = isDarkTheme ? '#e2e8f0' : '#888';
  const clearTextColor = isDarkTheme ? '#a7f3d0' : '#2ECC71';
  const separatorColor = isDarkTheme ? '#2D3748' : '#eee';

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#0F172A' : '#fff' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>{words.Search}</Text>
      </View>

      {/* Search Input */}
      <View style={[styles.searchInputContainer, { backgroundColor: inputBackgroundColor }]}>
        <Ionicons name="search" size={20} color={iconColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: inputTextColor }]}
          placeholder={words.Search}
          placeholderTextColor={isDarkTheme ? '#94A3B8' : '#999'}
        />
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="options-outline" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Recent Search Header */}
      <View style={styles.recentHeader}>
        <Text style={[styles.recentTitle, { color: textColor }]}>{words.RecentSearch}</Text>
        <TouchableOpacity>
          <Text style={styles.clearButton}>{words.Clear}</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Search List */}
      <ScrollView>
        {[
          { name: 'Fashion Store', address: '45, Jos Avenue 34 Crescent', distance: '11.1 km' },
          { name: 'Grocery store', address: '45, Jos Avenue 34 Crescent', distance: '7.4 km' },
          { name: 'Events Center', address: '45, Jos Avenue 34 Crescent', distance: '6.0 km' },
          { name: 'Crunchies', address: '45, Jos Avenue 34 Crescent', distance: '13.7 km' },
          { name: 'Ice', address: '45, Jos Avenue 34 Crescent', distance: '13 km' },
          { name: 'Fashion Store', address: '45, Jos Avenue 34 Crescent', distance: '13.1 km' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={[styles.recentItem, { borderBottomColor: separatorColor }]}>
            <Ionicons name="time-outline" size={20} color={iconColor} style={styles.timeIcon} />
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, { color: textColor }]}>{item.name}</Text>
              <Text style={[styles.itemAddress, { color: iconColor }]}>{item.address}</Text>
            </View>
            <Text style={[styles.itemDistance, { color: iconColor }]}>{item.distance}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
  },
  optionsButton: {
    padding: 8,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearButton: {
    color: '#2ECC71',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  timeIcon: {
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemAddress: {
    fontSize: 12,
  },
  itemDistance: {
    fontSize: 12,
  },
});

export default SearchScreen;