import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import userImg from '../../assets/images/home/user.png'; // Ensure this path is valid
import { useTheme } from '../../hooks/themeContext';

const translations = {
  English: {
    TipForDriver: "Tip for driver",
    Wow5Star: "Wow 5 star!",
    TipQuestion: "Do you want to add an additional tip for Daniel?",
    NoThanks: "No, Thanks",
    PayTip: "Pay tip",
  },
  Russian: {
    TipForDriver: "Чаевые водителю",
    Wow5Star: "Вот это 5 звезд!",
    TipQuestion: "Хотите добавить чаевые Даниилу?",
    NoThanks: "Нет, спасибо",
    PayTip: "Оплатить чаевые",
  },
  Ukrainian: {
    TipForDriver: "Чайові водієві",
    Wow5Star: "Вау, 5 зірок!",
    TipQuestion: "Бажаєте додати додаткові чайові для Даніеля?",
    NoThanks: "Ні, дякую",
    PayTip: "Сплатити чайові",
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


const Tip = () => {
  const words = useLanguage();
  const { isDarkTheme } = useTheme();
  const [selectedTip, setSelectedTip] = useState("₴3"); // Default selected tip

  const textColor = isDarkTheme ? '#fff' : '#333';
  const subTextColor = isDarkTheme ? '#aaa' : '#777';
  const tipAmounts = ["₴10", "₴20", "₴30", "₴40", "₴50"];

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? '#0F172A' : '#fff', padding: 20, paddingTop: 50 }}>

      {/* Header */}
      <View style={{ marginBottom: 20, flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => { router.back(); }}>
          <Ionicons name="chevron-back" size={24} color={isDarkTheme ? '#ccc' : '#888'} />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: textColor }}>{words.TipForDriver}</Text>
      </View>

      {/* Driver Info */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Image source={userImg} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: textColor }}>Daniel Jack</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="star" size={16} color="#FFC107" style={{ marginRight: 5 }} />
            <Text style={{ color: subTextColor, marginRight: 5 }}>4.5</Text>
            <Text style={{ color: subTextColor }}>| AD65GEJKFK</Text>
          </View>
        </View>
      </View>

      {/* Wow 5 star! */}
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 16, color: textColor }}>{words.Wow5Star}</Text>
      </View>
      <Text style={{ color: subTextColor, fontSize: 14, marginBottom: 20, textAlign: 'center' }}>
        {words.TipQuestion}
      </Text>

      {/* Tip Amounts */}
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{maxHeight:50,marginBottom: 25 }}>
        {tipAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={{
              backgroundColor: selectedTip === amount ? '#2ECC71' : 'transparent',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderWidth: selectedTip === amount ? 0 : 1,
              borderColor: selectedTip === amount ? 'transparent' : '#2ECC71',
              marginRight:15
            }}
            onPress={() => setSelectedTip(amount)}
          >
            <Text style={{
              color: selectedTip === amount ? '#fff' : '#2ECC71',
              fontWeight: 'bold',
              fontSize: 16
            }}>{amount}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{
            backgroundColor: isDarkTheme ? '#164E63' : '#E0F7FA',
            borderRadius: 10,
            paddingVertical: 15,
            flex: 1,
            marginRight: 10,
            alignItems: 'center',
          }}
          onPress={() => { router.back(); }}
        >
          <Text style={{ color: isDarkTheme ? '#fff' : '#000', fontSize: 16 }}>{words.NoThanks}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#2ECC71',
            borderRadius: 10,
            paddingVertical: 15,
            flex: 1,
            alignItems: 'center',
          }}
          onPress={() => { router.push('/home'); }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>{words.PayTip}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tip;