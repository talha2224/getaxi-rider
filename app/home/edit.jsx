import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';


const translations = {
  English: {
    EditProfile: "Edit profile",
    Name: "Name",
    EmailAddress: "Email address",
    PhoneNumber: "Phone number",
    Location: "Location",
    Gender: "Gender",
    AddNewLocation: "Save",
  },
  Russian: {
    EditProfile: "Редактировать профиль",
    Name: "Имя",
    EmailAddress: "Адрес электронной почты",
    PhoneNumber: "Номер телефона",
    Location: "Местоположение",
    Gender: "Пол",
    AddNewLocation: "Добавить новое местоположение",
  },
  Ukrainian: {
    EditProfile: "Редагувати профіль",
    Name: "Ім'я",
    EmailAddress: "Адреса електронної пошти",
    PhoneNumber: "Номер телефону",
    Location: "Місцезнаходження",
    Gender: "Стать",
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


const Edit = () => {
  const { isDarkTheme } = useTheme();
  const styles = getStyles(isDarkTheme);
  const words = useLanguage();

  const textColor = isDarkTheme ? '#fff' : '#000';
  const iconColor = isDarkTheme ? '#fff' : '#000';
  const chevronColor = isDarkTheme ? '#ccc' : '#777';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={iconColor} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>{words.EditProfile}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-outline" size={40} color="#777" />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Oliver Sandra</Text>
      </View>

      {/* Edit Fields */}
      {[
        { labelKey: 'Name', value: 'Oliver Sandra' },
        { labelKey: 'EmailAddress', value: 'Sandrabon@gmail.com' },
        { labelKey: 'PhoneNumber', value: '+124356678' },
        { labelKey: 'Location', value: 'United States' },
        { labelKey: 'Gender', value: 'Female' },
      ].map((field, index) => (
        <TouchableOpacity key={index} style={styles.editField}>
          <View>
            <Text style={styles.label}>{words[field.labelKey]}</Text>
            <Text style={styles.value}>{field.value}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color={chevronColor} />
        </TouchableOpacity>
      ))}

      {/* Add New Location Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.addLocationButton}>
        <Text style={styles.addLocationText}>{words.AddNewLocation}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Theme-based styles
const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0F172A' : '#fff',
      paddingTop:50,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    backButton: {
      marginRight: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
    },
    profileInfo: {
      paddingVertical: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDark ? '#444' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    editAvatarButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#27AE60',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    editField: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    label: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#777',
      marginBottom: 2,
    },
    value: {
      fontSize: 16,
      color: isDark ? '#eee' : '#333',
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
      fontSize: 18,
    },
  });

export default Edit;
