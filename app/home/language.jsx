import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext'; // assuming this returns { isDarkTheme }

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const availableLanguages = ['English', 'Ukrainian', 'Russian'];
  const { isDarkTheme } = useTheme();

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem("language", language)
  };

  const backgroundColor = isDarkTheme ? '#0F172A' : '#fff';
  const textColor = isDarkTheme ? '#fff' : '#333';
  const borderColor = isDarkTheme ? '#1E293B' : '#eee';
  const iconColor = isDarkTheme ? '#fff' : '#000';

  useEffect(() => {
    (async () => {
      let language = await AsyncStorage.getItem("language");
      setSelectedLanguage(language)

    })();
  })

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Language</Text>
      </View>

      {/* Language List */}
      {availableLanguages.map((lang) => (
        <TouchableOpacity
          key={lang}
          style={[styles.languageItem, { borderBottomColor: borderColor }]}
          onPress={() => handleLanguageSelect(lang)}
        >
          <Text style={[styles.languageText, { color: textColor }]}>{lang}</Text>
          {selectedLanguage === lang ? (
            <Ionicons name="checkmark-circle-sharp" size={24} color="#27AE60" />
          ) : (
            <View style={[styles.radioOuter, { borderColor: isDarkTheme ? '#94a3b8' : '#ccc' }]}>
              <View style={styles.radioInner} />
            </View>
          )}
        </TouchableOpacity>
      ))}
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
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  languageText: {
    fontSize: 16,
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
});

export default Language;
