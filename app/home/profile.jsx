import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import config from '../../config';
import { useTheme } from '../../hooks/themeContext';

const translations = {
    English: {
        Profile: "Profile",
        SavedPlaces: "Saved Places",
        Support: "Support",
        Messages: "Messages",
        Notifications: "Notifications",
        MyLocation: "My Location",
        ReportProblem: "Report a Problem",
        Language: "Language",
        Languages: "Languages",
        DarkMode: "Dark Mode",
        Logout: "Logout",
        EditProfile: "Edit profile",
        Address: "Address",
        PaymentSettings: "Payment Settings",
        PaymentMethods: "Payment methods",
        FavoriteLocations: "Favorite locations",
        TripsHistory: "Trips history",
        GeneralSettings: "General Settings",
        Notification: "Notification",
        ChangeCity: "Change city",
        ToggleTheme: "Toggle theme",
        SupportLegal: "Support & Legal",
        SupportCenter: "Support center",
        Security: "Security",
        LogoutConfirmation: "Logout",
        LogoutMessage: "Are you sure you want to logout?",
        YesPlease: "Yes, please",
        Cancel: "Cancel",
    },
    Russian: {
        Profile: "Профиль",
        SavedPlaces: "Сохраненные места",
        Support: "Поддержка",
        Messages: "Сообщения",
        Notifications: "Уведомления",
        MyLocation: "Мое местоположение",
        ReportProblem: "Сообщить о проблеме",
        Language: "Язык",
        Languages: "Языки",
        DarkMode: "Темный режим",
        Logout: "Выйти",
        EditProfile: "Редактировать профиль",
        Address: "Адрес",
        PaymentSettings: "Настройки оплаты",
        PaymentMethods: "Способы оплаты",
        FavoriteLocations: "Избранные места",
        TripsHistory: "История поездок",
        GeneralSettings: "Основные настройки",
        Notification: "Уведомления",
        ChangeCity: "Сменить город",
        ToggleTheme: "Переключить тему",
        SupportLegal: "Поддержка и правовые вопросы",
        SupportCenter: "Центр поддержки",
        Security: "Безопасность",
        LogoutConfirmation: "Выйти",
        LogoutMessage: "Вы уверены, что хотите выйти?",
        YesPlease: "Да, пожалуйста",
        Cancel: "Отмена",
    },
    Ukrainian: {
        Profile: "Профіль",
        SavedPlaces: "Збережені місця",
        Support: "Підтримка",
        Messages: "Повідомлення",
        Notifications: "Сповіщення",
        MyLocation: "Моє місцезнаходження",
        ReportProblem: "Повідомити про проблему",
        Language: "Мова",
        Languages: "Мови",
        DarkMode: "Темний режим",
        Logout: "Вийти",
        EditProfile: "Редагувати профіль",
        Address: "Адреса",
        PaymentSettings: "Налаштування оплати",
        PaymentMethods: "Способи оплати",
        FavoriteLocations: "Улюблені місця",
        TripsHistory: "Історія поїздок",
        GeneralSettings: "Загальні налаштування",
        Notification: "Сповіщення",
        ChangeCity: "Змінити місто",
        ToggleTheme: "Змінити тему",
        SupportLegal: "Підтримка та правові питання",
        SupportCenter: "Центр підтримки",
        Security: "Безпека",
        LogoutConfirmation: "Вийти",
        LogoutMessage: "Ви впевнені, що хочете вийти?",
        YesPlease: "Так, будь ласка",
        Cancel: "Скасувати",
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
const Profile = () => {
    const { isDarkTheme, toggleTheme } = useTheme();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const words = useLanguage();

    const handleLogout = () => {
        console.log('Logging out...');
        setIsLogoutModalVisible(false);
        router.replace('/login');
    };

    const handleCancelLogout = () => {
        setIsLogoutModalVisible(false);
    };

    const handleOpenLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };

    useEffect(() => {
        (async () => {
            try {
                let uid = await AsyncStorage.getItem("user_id");
                let result = await axios.get(`${config.baseUrl}/rider/info/${uid}`)
                setProfileData(result.data.data)
            } catch (error) {
                console.log(error, 'error in fetching progile')
            }
        })()
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#0F172A' : '#fff' }]}>
            <View style={[styles.header, { borderBottomColor: isDarkTheme ? '#1e293b' : '#eee' }]}>
                <Image source={profileData?.profile_img ? {uri:profileData?.profile_img} : userImg} style={styles.avatar} />
                <Text style={[styles.userName, { color: isDarkTheme ? '#fff' : '#000' }]}>{profileData?.username}</Text>
                <Text style={[styles.userPhone, { color: isDarkTheme ? '#ccc' : '#777' }]}>{profileData?.phone_number}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Personal Information */}
                <View style={[styles.section, { borderBottomColor: isDarkTheme ? '#1e293b' : '#eee' }]}>
                    <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.Profile}</Text>

                    <TouchableOpacity onPress={() => router.push("/home/edit")} style={styles.listItem}>
                        <Ionicons name="person-outline" size={20} style={{ marginRight: 10 }} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.EditProfile}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="location-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.Address}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/home/favorite')} style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="star-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.FavoriteLocations}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                </View>

                {/* Payment Settings */}
                <View style={[styles.section, { borderBottomColor: isDarkTheme ? '#1e293b' : '#eee' }]}>
                    <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.PaymentSettings}</Text>

                    <TouchableOpacity style={styles.listItem} onPress={() => router.push('/home/payment')}>
                        <Ionicons style={{ marginRight: 10 }} name="card-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.PaymentMethods}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/home/bookings')} style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="time-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.TripsHistory}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>
                </View>

                {/* General Settings */}
                <View style={[styles.section, { borderBottomColor: isDarkTheme ? '#1e293b' : '#eee' }]}>
                    <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.GeneralSettings}</Text>

                    <TouchableOpacity onPress={() => router.push('/home/notificationsettings')} style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="notifications-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.Notification}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/home/language')} style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="globe-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.Language}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="location-sharp" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.ChangeCity}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <Entypo name="colours" style={{ marginRight: 10 }} size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>
                            {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
                        </Text>
                        <Switch
                            trackColor={{ false: '#2ECC71', true: '#2ECC71' }}
                            thumbColor={isDarkTheme ? '#fff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleTheme(!isDarkTheme)}
                            value={isDarkTheme}
                        />
                    </TouchableOpacity>
                </View>

                {/* Support & Legal */}
                <View style={[styles.section, { borderBottomColor: isDarkTheme ? '#1e293b' : '#eee', paddingBottom: 80 }]}>
                    <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.SupportLegal}</Text>

                    <TouchableOpacity onPress={() => router.push('/home/support')} style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="headset-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.SupportCenter}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/home/security')} style={styles.listItem}>
                        <Ionicons style={{ marginRight: 10 }} name="document-text-outline" size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.Security}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleOpenLogoutModal} style={[styles.listItem, { marginBottom: 50 }]}>
                        <MaterialCommunityIcons name="logout" style={{ marginRight: 10 }} size={20} color="#27AE60" />
                        <Text style={[styles.listItemText, { color: isDarkTheme ? '#fff' : '#333' }]}>{words.Logout}</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#777" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isLogoutModalVisible}
                onRequestClose={handleCancelLogout}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContainer, { backgroundColor: isDarkTheme ? '#1e293b' : '#fff' }]}>
                        <View style={styles.iconContainer}>
                            <View style={styles.logoutIconCircle}>
                                <Ionicons name="log-out-outline" size={40} color="#E53935" />
                                <Ionicons name="arrow-forward-outline" size={20} color="white" style={styles.arrowIcon} />
                            </View>
                        </View>
                        <Text style={[styles.modalTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>{words.LogoutConfirmation}</Text>
                        <Text style={[styles.modalText, { color: isDarkTheme ? '#ccc' : '#444' }]}>
                            {words.LogoutMessage}
                        </Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>{words.YesPlease}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelLogout}>
                            <Text style={styles.cancelButtonText}>{words.Cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <BottomNavbar />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },
    header: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatarContainer: {
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ddd',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userPhone: {
        color: '#777',
        fontSize: 14,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    iconContainer: {
        width: 30,
        marginTop: -10,
        // alignItems: 'center',
        // marginRight: 15,
    },
    listItemText: {
        fontSize: 16,
        flex: 1,
        color: '#333',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    iconContainer: {
        marginBottom: 20,
    },
    logoutIconCircle: {
        backgroundColor: '#FFE0B2',
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    arrowIcon: {
        position: 'absolute',
        right: 10,
        color: '#E53935',
        fontSize: 30
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#E53935',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
    },
    cancelButton: {
        backgroundColor: '#E0F7FA',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#00BCD4',
    },
});

export default Profile;