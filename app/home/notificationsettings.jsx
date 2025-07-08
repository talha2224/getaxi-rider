import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';

const translations = {
    English: {
        Notifications: "Notifications",
        GeneralNotification: "General notification",
        SpecialOffers: "Special offers",
        Payments: "Payments",
        AppUpdates: "App updates",
        NewServiceAvailable: "New service available",
    },
    Russian: {
        Notifications: "Уведомления",
        GeneralNotification: "Общие уведомления",
        SpecialOffers: "Специальные предложения",
        Payments: "Платежи",
        AppUpdates: "Обновления приложения",
        NewServiceAvailable: "Новые услуги",
    },
    Ukrainian: {
        Notifications: "Сповіщення",
        GeneralNotification: "Загальні сповіщення",
        SpecialOffers: "Спеціальні пропозиції",
        Payments: "Платежі",
        AppUpdates: "Оновлення програми",
        NewServiceAvailable: "Нові послуги",
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


const NotificationSettings = () => {
    const { isDarkTheme } = useTheme();
    const words = useLanguage();

    const [generalNotificationsEnabled, setGeneralNotificationsEnabled] = useState(true);
    const [specialOffersEnabled, setSpecialOffersEnabled] = useState(false);
    const [paymentsEnabled, setPaymentsEnabled] = useState(false);
    const [appUpdatesEnabled, setAppUpdatesEnabled] = useState(true);
    const [newServiceAvailableEnabled, setNewServiceAvailableEnabled] = useState(true);

    const toggleGeneralNotifications = () => {
        setGeneralNotificationsEnabled(!generalNotificationsEnabled);
    };

    const toggleSpecialOffers = () => {
        setSpecialOffersEnabled(!specialOffersEnabled);
    };

    const togglePayments = () => {
        setPaymentsEnabled(!paymentsEnabled);
    };

    const toggleAppUpdates = () => {
        setAppUpdatesEnabled(!appUpdatesEnabled);
    };

    const toggleNewServiceAvailable = () => {
        setNewServiceAvailableEnabled(!newServiceAvailableEnabled);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#0F172A' : '#fff' }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: isDarkTheme ? '#1E293B' : '#eee' }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={isDarkTheme ? '#fff' : '#000'} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>{words.Notifications}</Text>
            </View>

            {/* Notification Settings List */}
            <View style={styles.settingsList}>
                {[
                    { labelKey: 'GeneralNotification', value: generalNotificationsEnabled, toggle: toggleGeneralNotifications },
                    { labelKey: 'SpecialOffers', value: specialOffersEnabled, toggle: toggleSpecialOffers },
                    { labelKey: 'Payments', value: paymentsEnabled, toggle: togglePayments },
                    { labelKey: 'AppUpdates', value: appUpdatesEnabled, toggle: toggleAppUpdates },
                    { labelKey: 'NewServiceAvailable', value: newServiceAvailableEnabled, toggle: toggleNewServiceAvailable },
                ].map((setting, index) => (
                    <View
                        key={index}
                        style={[
                            styles.settingItem,
                            { borderBottomColor: isDarkTheme ? '#1E293B' : '#eee' },
                        ]}
                    >
                        <Text style={[styles.settingLabel, { color: isDarkTheme ? '#e2e8f0' : '#333' }]}>
                            {words[setting.labelKey]}
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#27AE60' }}
                            thumbColor={setting.value ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setting.toggle}
                            value={setting.value}
                        />
                    </View>
                ))}
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
});

export default NotificationSettings;
