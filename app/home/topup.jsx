

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../../hooks/themeContext';


const translations = {
  English: {
    TopUp: "Top-up",
    EnterCustomAmount: "Enter custom amount",
    PaymentMethod: "Payment method",
    Continue: "Continue",
    Successful: "Successful",
    TopUpSuccessfulMessage: "Your top-up has been successful. Start exploring.",
    BookRide: "Book ride",
    NotNow: "Not now",
  },
  Russian: {
    TopUp: "Пополнить",
    EnterCustomAmount: "Введите свою сумму",
    PaymentMethod: "Способ оплаты",
    Continue: "Продолжить",
    Successful: "Успешно",
    TopUpSuccessfulMessage: "Ваше пополнение прошло успешно. Начните исследовать.",
    BookRide: "Заказать поездку",
    NotNow: "Не сейчас",
  },
  Ukrainian: {
    TopUp: "Поповнити",
    EnterCustomAmount: "Введіть власну суму",
    PaymentMethod: "Спосіб оплати",
    Continue: "Продовжити",
    Successful: "Успішно",
    TopUpSuccessfulMessage: "Ваше поповнення пройшло успішно. Почніть досліджувати.",
    BookRide: "Замовити поїздку",
    NotNow: "Не зараз",
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

const TopupSuccessModal = ({ isVisible, onClose, onBookRide }) => {
  const { isDarkTheme } = useTheme();
  const words = useLanguage();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            isDarkTheme && { backgroundColor: '#0F172A' }
          ]}
        >
          <View style={styles.successIconContainer}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark-sharp" size={48} color="white" />
            </View>
          </View>
          <Text
            style={[
              styles.modalTitle,
              isDarkTheme && { color: '#fff' }
            ]}
          >
            {words.Successful}
          </Text>
          <Text
            style={[
              styles.modalText,
              isDarkTheme && { color: '#ccc' }
            ]}
          >
            {words.TopUpSuccessfulMessage}
          </Text>
          <TouchableOpacity style={styles.bookRideButton} onPress={onBookRide}>
            <Text style={styles.bookRideText}>{words.BookRide}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notNowButton} onPress={onClose}>
            <Text style={styles.notNowText}>{words.NotNow}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Topup = () => {
  const [topupAmount, setTopupAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isDarkTheme } = useTheme();
  const words = useLanguage();

  const predefinedAmounts = ['50', '100', '200', '300', '500', '1000'];

  const handleAmountPress = (amount) => {
    setTopupAmount(amount);
  };

  const handleInputChange = (text) => {
    setTopupAmount(text.replace(/[^0-9]/g, ''));
  };

  const handleContinue = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleBookRide = () => {
    setIsModalVisible(false);
    router.push('/home');
  };

  return (
    <View
      style={[
        styles.container,
        isDarkTheme && { backgroundColor: '#0F172A' }
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          isDarkTheme && { borderBottomColor: '#1E293B' }
        ]}
      >
        <TouchableOpacity onPress={() => router.push('/home/wallet')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={isDarkTheme ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            isDarkTheme && { color: '#fff' }
          ]}
        >
          {words.TopUp}
        </Text>
      </View>

      {/* Amount Input */}
      <View style={[ styles.amountInputSection,isDarkTheme && { borderBottomColor: '#1E293B' }]}>
        <TextInput
          style={[
            styles.customAmountInput,
            isDarkTheme && {
              backgroundColor: '#1E293B',
              color: '#fff',
              borderColor: '#334155'
            }
          ]}
          placeholder={words.EnterCustomAmount}
          placeholderTextColor={isDarkTheme ? '#94A3B8' : '#999'}
          keyboardType="numeric"
          value={topupAmount}
          onChangeText={handleInputChange}
        />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.predefinedAmountsScroll}>
          {predefinedAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.predefinedAmountButton,
                isDarkTheme && { backgroundColor: '#1E293B' }
              ]}
              onPress={() => handleAmountPress(amount)}
            >
              <Text
                style={[
                  styles.predefinedAmountText,
                  isDarkTheme && { color: '#fff' }
                ]}
              >
                ৳{amount}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Payment Method */}
      <TouchableOpacity
        onPress={() => router.push('/home/payment')}
        style={[
          styles.paymentMethod,
          isDarkTheme && { borderBottomColor: '#1E293B' }
        ]}
      >
        <Text style={[styles.paymentMethodText, isDarkTheme && { color: '#fff' }]}>
          {words.PaymentMethod}
        </Text>
        <Ionicons name="chevron-forward" size={20} color={isDarkTheme ? '#fff' : 'black'} />
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>{words.Continue}</Text>
      </TouchableOpacity>

      <TopupSuccessModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onBookRide={handleBookRide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  amountInputSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  customAmountInput: {
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  predefinedAmountsScroll: {
    marginBottom: 15,
  },
  predefinedAmountButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  predefinedAmountText: {
    fontSize: 16,
    color: '#000',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
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
  successIconContainer: {
    backgroundColor: '#E7F6E7',
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  successCircle: {
    backgroundColor: '#27AE60',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
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
  bookRideButton: {
    backgroundColor: '#27AE60',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  bookRideText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  notNowButton: {
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  notNowText: {
    color: '#00BCD4',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Topup;
