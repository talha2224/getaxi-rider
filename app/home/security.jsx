import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';


const translations = {
  English: {
    Security: "Security",
    BiometricID: "Biometric ID",
    FaceID: "Face ID",
    GoogleAuthenticator: "Google authenticator",
    ChangePassword: "Change password",
  },
  Russian: {
    Security: "Безопасность",
    BiometricID: "Биометрический ID",
    FaceID: "Face ID",
    GoogleAuthenticator: "Google Authenticator",
    ChangePassword: "Изменить пароль",
  },
  Ukrainian: {
    Security: "Безпека",
    BiometricID: "Біометричний ID",
    FaceID: "Face ID",
    GoogleAuthenticator: "Google Authenticator",
    ChangePassword: "Змінити пароль",
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
const Security = () => {
  const { isDarkTheme } = useTheme();
  const words = useLanguage();

  const [biometricIdEnabled, setBiometricIdEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [googleAuthenticatorEnabled, setGoogleAuthenticatorEnabled] = useState(false);

  const toggleBiometricId = () => setBiometricIdEnabled(!biometricIdEnabled);
  const toggleFaceId = () => setFaceIdEnabled(!faceIdEnabled);
  const toggleGoogleAuthenticator = () => setGoogleAuthenticatorEnabled(!googleAuthenticatorEnabled);

  const handleChangePassword = () => router.back();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#0F172A' : '#fff' }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: isDarkTheme ? '#2D3748' : '#eee' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={isDarkTheme ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>{words.Security}</Text>
      </View>

      {/* Settings List */}
      <View style={styles.settingsList}>
        <View style={[styles.settingItem, { borderBottomColor: isDarkTheme ? '#2D3748' : '#eee' }]}>
          <Text style={[styles.settingLabel, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.BiometricID}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#27AE60' }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleBiometricId}
            value={biometricIdEnabled}
          />
        </View>

        <View style={[styles.settingItem, { borderBottomColor: isDarkTheme ? '#2D3748' : '#eee' }]}>
          <Text style={[styles.settingLabel, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.FaceID}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#27AE60' }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleFaceId}
            value={faceIdEnabled}
          />
        </View>

        <View style={[styles.settingItem, { borderBottomColor: isDarkTheme ? '#2D3748' : '#eee' }]}>
          <Text style={[styles.settingLabel, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.GoogleAuthenticator}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#27AE60' }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleGoogleAuthenticator}
            value={googleAuthenticatorEnabled}
          />
        </View>

        <TouchableOpacity
          style={[styles.changePasswordItem, { borderBottomColor: isDarkTheme ? '#2D3748' : '#eee' }]}
          onPress={handleChangePassword}
        >
          <Text style={[styles.settingLabel, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.ChangePassword}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={isDarkTheme ? '#aaa' : '#777'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
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
  settingsList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
  },
  changePasswordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
});

export default Security;
