import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext';


const translations = {
  English: {
    SupportCenter: "Support center",
    FAQ: "FAQ",
    ContactUs: "Contact us",
    BookRideQuestion: "How do I book a ride?",
    BookRideAnswer: "It's important to address common questions and concerns that users may have about the app. Here are some necessary questions to include",
    ScheduleRideQuestion: "Can I schedule a ride in advance?",
    ScheduleRideAnswer: "Information about scheduling rides in advance would go here.",
    DriverCancelsQuestion: "What if my driver cancels the ride?",
    DriverCancelsAnswer: "Details about what happens if a driver cancels a ride.",
    ReportIssueQuestion: "How do I report an issue with my ride?",
    ReportIssueAnswer: "Steps on how to report an issue with a ride.",
  },
  Russian: {
    SupportCenter: "Центр поддержки",
    FAQ: "FAQ",
    ContactUs: "Связаться с нами",
    BookRideQuestion: "Как заказать поездку?",
    BookRideAnswer: "Важно ответить на распространенные вопросы и опасения пользователей относительно приложения. Вот некоторые необходимые вопросы.",
    ScheduleRideQuestion: "Могу ли я забронировать поездку заранее?",
    ScheduleRideAnswer: "Информация о предварительном заказе поездок будет здесь.",
    DriverCancelsQuestion: "Что если мой водитель отменит поездку?",
    DriverCancelsAnswer: "Подробности о том, что происходит, если водитель отменяет поездку.",
    ReportIssueQuestion: "Как сообщить о проблеме с моей поездкой?",
    ReportIssueAnswer: "Шаги по сообщению о проблеме с поездкой.",
  },
  Ukrainian: {
    SupportCenter: "Центр підтримки",
    FAQ: "FAQ",
    ContactUs: "Зв'язатися з нами",
    BookRideQuestion: "Як забронювати поїздку?",
    BookRideAnswer: "Важливо відповісти на поширені запитання та занепокоєння користувачів щодо програми. Ось деякі необхідні питання.",
    ScheduleRideQuestion: "Чи можу я запланувати поїздку заздалегідь?",
    ScheduleRideAnswer: "Інформація про планування поїздок заздалегідь буде тут.",
    DriverCancelsQuestion: "Що робити, якщо мій водій скасує поїздку?",
    DriverCancelsAnswer: "Деталі про те, що відбувається, якщо водій скасовує поїздку.",
    ReportIssueQuestion: "Як повідомити про проблему з моєю поїздкою?",
    ReportIssueAnswer: "Кроки щодо повідомлення про проблему з поїздкою.",
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


const Support = () => {
  const { isDarkTheme } = useTheme();
  const [faqExpanded, setFaqExpanded] = useState(true);
  const [scheduleRideExpanded, setScheduleRideExpanded] = useState(false);
  const [driverCancelsExpanded, setDriverCancelsExpanded] = useState(false);
  const [reportIssueExpanded, setReportIssueExpanded] = useState(false);
  const words = useLanguage();

  const toggleFaq = () => setFaqExpanded(!faqExpanded);
  const toggleScheduleRide = () => setScheduleRideExpanded(!scheduleRideExpanded);
  const toggleDriverCancels = () => setDriverCancelsExpanded(!driverCancelsExpanded);
  const toggleReportIssue = () => setReportIssueExpanded(!reportIssueExpanded);
  const handleContactUs = () => console.log('Contact us pressed');

  // Dynamic Colors
  const bgColor = isDarkTheme ? '#0F172A' : '#fff';
  const textColor = isDarkTheme ? '#fff' : '#333';
  const fadedTextColor = isDarkTheme ? '#94a3b8' : '#777';
  const borderColor = isDarkTheme ? '#1E293B' : '#eee';
  const iconColor = isDarkTheme ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>{words.SupportCenter}</Text>
      </View>

      {/* Tab Buttons */}
      <View style={[styles.tabButtons, { borderBottomColor: borderColor }]}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.activeTabText}>{words.FAQ}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleContactUs}>
          <Text style={[styles.tabText, { color: fadedTextColor }]}>{words.ContactUs}</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={toggleFaq}>
          <Text style={[styles.questionText, { color: textColor }]}>{words.BookRideQuestion}</Text>
          <Ionicons name={faqExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
        </TouchableOpacity>
        {faqExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>
          {words.BookRideAnswer}
        </Text>}

        <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={toggleScheduleRide}>
          <Text style={[styles.questionText, { color: textColor }]}>{words.ScheduleRideQuestion}</Text>
          <Ionicons name={scheduleRideExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
        </TouchableOpacity>
        {scheduleRideExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>
          {words.ScheduleRideAnswer}
        </Text>}

        <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={toggleDriverCancels}>
          <Text style={[styles.questionText, { color: textColor }]}>{words.DriverCancelsQuestion}</Text>
          <Ionicons name={driverCancelsExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
        </TouchableOpacity>
        {driverCancelsExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>
          {words.DriverCancelsAnswer}
        </Text>}

        <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={toggleReportIssue}>
          <Text style={[styles.questionText, { color: textColor }]}>{words.ReportIssueQuestion}</Text>
          <Ionicons name={reportIssueExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
        </TouchableOpacity>
        {reportIssueExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>
          {words.ReportIssueAnswer}
        </Text>}
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
  tabButtons: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#27AE60',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  faqSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  questionText: {
    fontSize: 16,
    flex: 1,
  },
  answerText: {
    fontSize: 14,
    paddingVertical: 10,
  },
});

export default Support;
