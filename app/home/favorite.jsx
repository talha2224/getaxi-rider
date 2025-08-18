import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../../config';
import { useTheme } from '../../hooks/themeContext';

const translations = {
  English: {
    FavoriteLocation: "Favorite locations",
    Home: "Home",
    Office: "Office",
    Store: "Store",
    AddNewLocation: "Add new location",
    Title: "Title",
    Description: "Description",
    Save: "Save",
    Cancel: "Cancel",
  },
  Russian: {
    FavoriteLocation: "Избранные места",
    Home: "Дом",
    Office: "Офис",
    Store: "Магазин",
    AddNewLocation: "Добавить новое место",
    Title: "Название",
    Description: "Описание",
    Save: "Сохранить",
    Cancel: "Отмена",
  },
  Ukrainian: {
    FavoriteLocation: "Улюблені місця",
    Home: "Дім",
    Office: "Офіс",
    Store: "Магазин",
    AddNewLocation: "Додати нове місце",
    Title: "Назва",
    Description: "Опис",
    Save: "Зберегти",
    Cancel: "Скасувати",
  },
};

const getTranslations = async (language) => {
  try {
    if (translations[language]) return translations[language];
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

const Favorite = () => {
  const { isDarkTheme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const words = useLanguage();
  const [uid, setUid] = useState(null);

  const colors = {
    background: isDarkTheme ? '#0F172A' : '#fff',
    textPrimary: isDarkTheme ? '#fff' : '#000',
    textSecondary: isDarkTheme ? '#bbb' : '#777',
    border: isDarkTheme ? '#334155' : '#eee',
    locationSelectedBg: isDarkTheme ? '#1e293b' : '#f9f9f9',
    radioBorder: isDarkTheme ? '#888' : '#ccc',
    iconBackground: '#27AE60',
    iconColor: '#fff',
    checkmarkColor: '#27AE60',
    inputBg: isDarkTheme ? '#1e293b' : '#f0f0f0',
    inputText: isDarkTheme ? '#fff' : '#000',
  };

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("user_id");
      setUid(id);
      fetchLocations(id);
    })();
  }, []);

  const fetchLocations = async (id) => {
    try {
      const res = await axios.get(`${config.baseUrl}/place/rider/${id}`);
      setLocations(res.data.data || []);
    } catch (error) {
      console.log("Error fetching locations", error);
      Toast.show({ type: 'error', text1: 'Failed to load locations' });
    }
  };

  const handleSaveLocation = async () => {
    if (!title || !description) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }
    try {
      await axios.post(`${config.baseUrl}/place/create`, {
        title,
        description,
        riderId: uid,
      });
      Toast.show({ type: 'success', text1: 'Location saved successfully' });
      setModalVisible(false);
      setTitle("");
      setDescription("");
      fetchLocations(uid);
    } catch (error) {
      console.log(error);
      Toast.show({ type: 'error', text1: 'Failed to save location' });
    }
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

      {/* Location List */}
      <ScrollView>
        {locations.map((location) => (
          <TouchableOpacity
            key={location._id}
            style={[
              styles.locationItem,
              { borderBottomColor: colors.border },
              selectedLocation === location._id && { backgroundColor: colors.locationSelectedBg },
            ]}
            onPress={() => setSelectedLocation(location._id)}
          >
            <View style={[styles.locationIcon, { backgroundColor: colors.iconBackground }]}>
              <Ionicons name="location-sharp" size={24} color={colors.iconColor} />
            </View>
            <View style={styles.locationDetails}>
              <Text style={[styles.locationName, { color: colors.textPrimary }]}>{location.title}</Text>
              <Text style={[styles.locationAddress, { color: colors.textSecondary }]}>{location.description}</Text>
            </View>
            {selectedLocation === location._id ? (
              <Ionicons name="checkmark-circle-sharp" size={24} color={colors.checkmarkColor} />
            ) : (
              <View style={[styles.radioOuter, { borderColor: colors.radioBorder }]}>
                <View style={styles.radioInner} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add New Location Button */}
      <TouchableOpacity style={styles.addLocationButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addLocationText}>{words.AddNewLocation}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{words.AddNewLocation}</Text>
            <TextInput
              placeholder={words.Title}
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.inputText }]}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder={words.Description}
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.inputText }]}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
                <Text style={styles.saveButtonText}>{words.Save}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>{words.Cancel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  locationItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1 },
  locationIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  locationDetails: { flex: 1 },
  locationName: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  locationAddress: { fontSize: 14 },
  radioOuter: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: 'transparent' },
  addLocationButton: { backgroundColor: '#27AE60', paddingVertical: 15, borderRadius: 8, margin: 20, alignItems: 'center' },
  addLocationText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { width: '100%', padding: 12, borderRadius: 8, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  saveButton: { backgroundColor: '#27AE60', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#ccc', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  cancelButtonText: { color: '#000', fontWeight: 'bold' },
});

export default Favorite;
