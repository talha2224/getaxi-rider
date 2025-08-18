import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../../config';
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
  } catch (error) {
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
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const iconColor = isDarkTheme ? '#fff' : '#000';

  useEffect(() => {
    (async () => {
      try {
        let uid = await AsyncStorage.getItem("user_id");
        let result = await axios.get(`${config.baseUrl}/rider/info/${uid}`);
        const data = result.data.data;
        setProfileData(data);
        setName(data.username || "");
        setPhone(data.phone_number || "");
        setLocation(data?.location || "");
        setGender(data.gender || "");
        setAvatar(data.profile_img || null);
      } catch (error) {
        console.log(error, 'error in fetching profile');
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      let uid = await AsyncStorage.getItem("user_id");
      await axios.put(`${config.baseUrl}/rider/update/${uid}`, {
        username: name,
        phone_number: phone,
        location,
        gender,
      });
      Toast.show({ type: 'success', text1: "Profile updated successfully" });
    } catch (error) {
      Toast.show({ type: 'error', text1: "Failed to update profile" });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      try {
        let uid = await AsyncStorage.getItem("user_id");
        console.log(uid,'uid')
        const formData = new FormData();
        formData.append('image', {
          uri: result.assets[0].uri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        });

        await axios.put(`${config.baseUrl}/rider/upload/${uid}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setAvatar(result.assets[0].uri);
        Toast.show({ type: 'success', text1: "Profile picture updated" });
      } catch (error) {
        console.log(error,'error')
        Toast.show({ type: 'error', text1: "Failed to upload image" });
      }
    }
  };
  
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
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarPlaceholder} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person-outline" size={40} color="#777" />
            </View>
          )}
          <TouchableOpacity style={styles.editAvatarButton} onPress={pickImage}>
            <Ionicons name="camera-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{name}</Text>
      </View>

      {/* Edit Fields */}
      <View style={styles.editField}>
        <Text style={styles.label}>{words.Name}</Text>
        <TextInput value={name} onChangeText={setName} placeholderTextColor="#aaa" style={styles.input} />
      </View>
      <View style={styles.editField}>
        <Text style={styles.label}>{words.PhoneNumber}</Text>
        <TextInput value={phone} onChangeText={setPhone} placeholderTextColor="#aaa" style={styles.input} keyboardType="phone-pad" />
      </View>
      <View style={styles.editField}>
        <Text style={styles.label}>{words.Location}</Text>
        <TextInput value={location} onChangeText={setLocation} placeholderTextColor="#aaa" style={styles.input} />
      </View>
      <View style={styles.editField}>
        <Text style={styles.label}>{words.Gender}</Text>
        <TextInput value={gender} onChangeText={setGender} placeholderTextColor="#aaa" style={styles.input} />
      </View>

      {/* Save Button */}
      <TouchableOpacity onPress={handleSave} style={styles.addLocationButton}>
        <Text style={styles.addLocationText}>{words.AddNewLocation}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0F172A' : '#fff',
      paddingTop: 50,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    backButton: { marginRight: 10 },
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
    avatarContainer: { position: 'relative', marginBottom: 10 },
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
    userName: { fontSize: 18, fontWeight: 'bold', color: isDark ? '#fff' : '#000' },
    editField: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#eee',
    },
    label: { fontSize: 14, color: isDark ? '#aaa' : '#777', marginBottom: 2 },
    input: { color: isDark ? '#fff' : '#000', width: '100%' },
    addLocationButton: {
      backgroundColor: '#27AE60',
      paddingVertical: 15,
      borderRadius: 8,
      margin: 20,
      alignItems: 'center',
    },
    addLocationText: { color: '#fff', fontSize: 18 },
  });

export default Edit;
