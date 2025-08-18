import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTheme } from '../../hooks/themeContext';

const translations = {
  English: {
    SupportCenter: "Support center",
    FAQ: "FAQ",
    ContactUs: "Contact us",
    Subject: "Subject",
    Message: "Message",
    SendMessage: "Send message",
    MsgSent: "Message sent",
    MsgDetail: "We will get back to you as soon as possible",
    BookRideQuestion: "How do I book a ride?",
    BookRideAnswer: "It's important to address common questions and concerns that users may have about the app. Here are some necessary questions to include",
    ScheduleRideQuestion: "Can I schedule a ride in advance?",
    ScheduleRideAnswer: "Information about scheduling rides in advance would go here.",
    DriverCancelsQuestion: "What if my driver cancels the ride?",
    DriverCancelsAnswer: "Details about what happens if a driver cancels a ride.",
    ReportIssueQuestion: "How do I report an issue with my ride?",
    ReportIssueAnswer: "Steps on how to report an issue with a ride.",
  }
  // Russian / Ukrainian can be added similarly
};

const getTranslations = async (language) => {
  try {
    if (translations[language]) return translations[language];
    return translations["English"];
  } catch {
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
  const words = useLanguage();

  const [activeTab, setActiveTab] = useState('faq');
  const [faqExpanded, setFaqExpanded] = useState(true);
  const [scheduleRideExpanded, setScheduleRideExpanded] = useState(false);
  const [driverCancelsExpanded, setDriverCancelsExpanded] = useState(false);
  const [reportIssueExpanded, setReportIssueExpanded] = useState(false);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const bgColor = isDarkTheme ? '#0F172A' : '#fff';
  const textColor = isDarkTheme ? '#fff' : '#333';
  const fadedTextColor = isDarkTheme ? '#94a3b8' : '#777';
  const borderColor = isDarkTheme ? '#1E293B' : '#eee';
  const inputBg = isDarkTheme ? '#1E293B' : '#f4f4f4';
  const iconColor = isDarkTheme ? '#fff' : '#000';

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }
    Toast.show({ type: 'success', text1: words.MsgSent, text2: words.MsgDetail });
    setSubject('');
    setMessage('');
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>{words.SupportCenter}</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabButtons, { borderBottomColor: borderColor }]}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'faq' && styles.activeTab]}
          onPress={() => setActiveTab('faq')}
        >
          <Text style={activeTab === 'faq' ? styles.activeTabText : [styles.tabText, { color: fadedTextColor }]}>
            {words.FAQ}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
        >
          <Text style={activeTab === 'contact' ? styles.activeTabText : [styles.tabText, { color: fadedTextColor }]}>
            {words.ContactUs}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {activeTab === 'faq' ? (
          <View style={styles.faqSection}>
            <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={() => setFaqExpanded(!faqExpanded)}>
              <Text style={[styles.questionText, { color: textColor }]}>{words.BookRideQuestion}</Text>
              <Ionicons name={faqExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
            </TouchableOpacity>
            {faqExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>{words.BookRideAnswer}</Text>}

            <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={() => setScheduleRideExpanded(!scheduleRideExpanded)}>
              <Text style={[styles.questionText, { color: textColor }]}>{words.ScheduleRideQuestion}</Text>
              <Ionicons name={scheduleRideExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
            </TouchableOpacity>
            {scheduleRideExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>{words.ScheduleRideAnswer}</Text>}

            <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={() => setDriverCancelsExpanded(!driverCancelsExpanded)}>
              <Text style={[styles.questionText, { color: textColor }]}>{words.DriverCancelsQuestion}</Text>
              <Ionicons name={driverCancelsExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
            </TouchableOpacity>
            {driverCancelsExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>{words.DriverCancelsAnswer}</Text>}

            <TouchableOpacity style={[styles.faqQuestion, { borderBottomColor: borderColor }]} onPress={() => setReportIssueExpanded(!reportIssueExpanded)}>
              <Text style={[styles.questionText, { color: textColor }]}>{words.ReportIssueQuestion}</Text>
              <Ionicons name={reportIssueExpanded ? 'remove-outline' : 'add-outline'} size={20} color={fadedTextColor} />
            </TouchableOpacity>
            {reportIssueExpanded && <Text style={[styles.answerText, { color: fadedTextColor }]}>{words.ReportIssueAnswer}</Text>}
          </View>
        ) : (
          <View style={{ padding: 20 }}>
            <Text style={[styles.label, { color: textColor }]}>{words.Subject}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              value={subject}
              onChangeText={setSubject}
              placeholder={words.Subject}
              placeholderTextColor={fadedTextColor}
            />

            <Text style={[styles.label, { color: textColor, marginTop: 15 }]}>{words.Message}</Text>
            <TextInput
              style={[styles.textarea, { backgroundColor: inputBg, color: textColor }]}
              value={message}
              onChangeText={setMessage}
              placeholder={words.Message}
              placeholderTextColor={fadedTextColor}
              multiline
              numberOfLines={5}
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>{words.SendMessage}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  tabButtons: { flexDirection: 'row', borderBottomWidth: 1 },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#27AE60' },
  tabText: { fontSize: 16 },
  activeTabText: { fontSize: 16, fontWeight: 'bold', color: '#27AE60' },
  faqSection: { paddingHorizontal: 20, paddingTop: 20 },
  faqQuestion: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
  questionText: { fontSize: 16, flex: 1 },
  answerText: { fontSize: 14, paddingVertical: 10 },
  label: { fontSize: 14, marginBottom: 5 },
  input: { padding: 10, borderRadius: 8, fontSize: 14 },
  textarea: { padding: 10, borderRadius: 8, fontSize: 14, height: 120, textAlignVertical: 'top' },
  sendButton: { backgroundColor: '#27AE60', paddingVertical: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Support;
