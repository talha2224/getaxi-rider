import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/themeContext'; // Assuming you have this

const ReceiptUI = () => {
  const { isDarkTheme } = useTheme();
  const textColor = isDarkTheme ? '#F9FAFB' : '#1E293B';
  const secondaryTextColor = isDarkTheme ? '#D1D5DB' : '#4B5563';
  const backgroundColor = isDarkTheme ? '#0F172A' : '#fff';
  const cardBackgroundColor = isDarkTheme ? '#1E293B' : '#F9FAFB';
  const buttonBackgroundColor ='#2ECC71';
  const buttonTextColor = '#fff';
  const borderColor = isDarkTheme ? '#334155' : '#E5E7EB';
  const backIconColor = isDarkTheme ? '#e2e8f0' : '#888';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={backIconColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>E-receipt</Text>
      </View>

      <View style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Order ID</Text>
          <Text style={[styles.value, { color: textColor }]}>D353F353623</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Pickup</Text>
          <Text style={[styles.value, { color: textColor }]}>12,Ave relian</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Drop-off</Text>
          <Text style={[styles.value, { color: textColor }]}>Thomas st Sydney</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Date</Text>
          <Text style={[styles.value, { color: textColor }]}>25 March, 2025</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Time</Text>
          <Text style={[styles.value, { color: textColor }]}>9:00 AM</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Recipient's name</Text>
          <Text style={[styles.value, { color: textColor }]}>Jenny Thompson</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Phone number</Text>
          <Text style={[styles.value, { color: textColor }]}>01234676</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Sender's name</Text>
          <Text style={[styles.value, { color: textColor }]}>Favor Rock</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={[styles.label, { color: secondaryTextColor }]}>Estimated cost</Text>
          <Text style={[styles.value, { color: textColor, fontWeight: 'bold' }]}>₴ 1200</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>Send via SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: buttonBackgroundColor }]}>
        <Text style={[styles.buttonText, { color: buttonBackgroundColor }]}>Email receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:30
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ReceiptUI;