import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';

const translations = {
  English: {
    Notifications: "Notification",
    Today: "Today",
    SpecialDiscount: "25% Special discount",
    DiscountSubtitle: "Buy any any item today and get 25% off. Offer last 24h",
    PaymentSuccessful: "Payment successful",
    PaymentSubtitle: "You just made a payment for taxi. Enjoy your ride!",
    NewServicesAvailable: "New services available",
    NewServicesSubtitle: "You can now track drivers closer by in just a nick of time",
    March1st: "1st March, 2025",
  },
  Russian: {
    Notifications: "Уведомления",
    Today: "Сегодня",
    SpecialDiscount: "Специальная скидка 25%",
    DiscountSubtitle: "Купите любой товар сегодня и получите скидку 25%. Предложение действует 24 часа",
    PaymentSuccessful: "Оплата прошла успешно",
    PaymentSubtitle: "Вы только что оплатили такси. Наслаждайтесь поездкой!",
    NewServicesAvailable: "Доступны новые услуги",
    NewServicesSubtitle: "Теперь вы можете отслеживать водителей точнее в кратчайшие сроки",
    March1st: "1 марта 2025 г.",
  },
  Ukrainian: {
    Notifications: "Сповіщення",
    Today: "Сьогодні",
    SpecialDiscount: "Спеціальна знижка 25%",
    DiscountSubtitle: "Купуйте будь-який товар сьогодні та отримайте знижку 25%. Пропозиція діє 24 години",
    PaymentSuccessful: "Оплата успішна",
    PaymentSubtitle: "Ви щойно оплатили таксі. Насолоджуйтесь поїздкою!",
    NewServicesAvailable: "Доступні нові послуги",
    NewServicesSubtitle: "Тепер ви можете відстежувати водіїв точніше за лічені секунди",
    March1st: "1 березня 2025 р.",
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


const NotificationScreen = () => {
  const words = useLanguage();
  const { isDarkTheme } = useTheme();
  const textColor = isDarkTheme ? '#fff' : '#333';
  const subtitleColor = isDarkTheme ? '#ccc' : '#777';
  const backgroundColor = isDarkTheme ? '#0F172A' : '#fff';
  const itemBackgroundColor = isDarkTheme ? '#1E293B' : '#f9f9f9';
  const iconBackgroundColor = isDarkTheme ? '#2D3748' : '#e6f9e8';
  const backIconColor = isDarkTheme ? '#e2e8f0' : '#888';

  const notifications = [
    {
      date: words.Today,
      items: [
        {
          icon: 'pricetag-outline',
          iconColor: '#2ECC71',
          title: words.SpecialDiscount,
          subtitle: words.DiscountSubtitle,
        },
        {
          icon: 'checkmark-circle-outline',
          iconColor: '#2ECC71',
          title: words.PaymentSuccessful,
          subtitle: words.PaymentSubtitle,
        },
        {
          icon: 'add-circle-outline',
          iconColor: '#2ECC71',
          title: words.NewServicesAvailable,
          subtitle: words.NewServicesSubtitle,
        },
      ],
    },
    {
      date: words.March1st,
      items: [
        {
          icon: 'checkmark-circle-outline',
          iconColor: '#2ECC71',
          title: words.PaymentSuccessful,
          subtitle: words.PaymentSubtitle,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/home")} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={backIconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>{words.Notifications}</Text>
      </View>

      {/* Notification List */}
      <ScrollView>
        {notifications.map((section, index) => (
          <View key={index}>
            <Text style={[styles.date, { color: textColor }]}>{section.date}</Text>
            {section.items.map((item, itemIndex) => (
              <View
                key={itemIndex}
                style={[styles.notificationItem, { backgroundColor: itemBackgroundColor }]}
              >
                <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                  <Ionicons name={item.icon} size={24} color={item.iconColor} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.itemTitle, { color: textColor }]}>{item.title}</Text>
                  <Text style={[styles.itemSubtitle, { color: subtitleColor }]}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
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
  date: {
    marginBottom: 10,
  },
  notificationItem: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
  },
});
export default NotificationScreen;