import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import { useTheme } from '../../hooks/themeContext';

const transactions = [
  {
    id: '1',
    type: 'topup',
    description: 'Top-up',
    date: 'Today',
    time: '10:30 AM',
    amount: '212,140',
    label: 'Top-up',
  },
  {
    id: '2',
    type: 'expense',
    name: 'Daniel Jones',
    date: 'Yesterday',
    time: '10:30 AM',
    amount: '249',
    label: 'Taxi expense',
    image: userImg,
  },
  {
    id: '3',
    type: 'topup',
    description: 'Top-up',
    date: 'March 5, 2025',
    time: '10:30 AM',
    amount: '100',
    label: 'Top-up',
  },
  {
    id: '4',
    type: 'topup',
    description: 'Top-up',
    date: 'March 3, 2025',
    time: '10:30 AM',
    amount: '256',
    label: 'Top-up',
  },
  {
    id: '5',
    type: 'expense',
    name: 'Angelina Ned',
    date: 'March 3, 2025',
    time: '10:30 AM',
    amount: '274',
    label: 'Taxi expense',
    image: userImg,
  },
  {
    id: '6',
    type: 'expense',
    name: 'Samuel',
    date: 'March 2, 2025',
    time: '10:30 AM',
    amount: '225',
    label: 'Something else',
    image: userImg,
  },
];

const Wallet = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.container, isDarkTheme && { backgroundColor: '#0F172A' }]}>
      {/* Balance Section */}
      <View
        style={[
          styles.balanceSection,
          isDarkTheme && {
            backgroundColor: '#1E293B',
            borderBottomColor: '#334155',
          },
        ]}
      >
        <Text style={[styles.balanceLabel, isDarkTheme && { color: '#CBD5E1' }]}>My balance</Text>
        <Text style={[styles.balanceAmount, isDarkTheme && { color: '#FFFFFF' }]}>৳140,000.00</Text>
        <TouchableOpacity onPress={() => router.push('/home/topup')} style={styles.topUpButton}>
          <Ionicons name="add" size={18} color="white" />
          <Text style={styles.topUpText}> Top-up</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <View style={[styles.transactionHistorySection]}>
        <View style={styles.transactionHistoryHeader}>
          <Text style={[styles.transactionHistoryTitle, isDarkTheme && { color: '#FFFFFF' }]}>
            Transaction history
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={[
                styles.transactionItem,
                isDarkTheme && {
                  borderBottomColor: '#334155',
                },
              ]}
            >
              <View style={styles.transactionIconContainer}>
                {transaction.type === 'topup' ? (
                  <View style={styles.topUpIcon}>
                    <Ionicons name="arrow-up-outline" size={24} color="#fff" />
                  </View>
                ) : (
                  <Image source={transaction.image} style={styles.expenseIcon} />
                )}
              </View>
              <View style={styles.transactionDetails}>
                <Text
                  style={[
                    styles.transactionDescription,
                    isDarkTheme && { color: '#FFFFFF' },
                  ]}
                >
                  {transaction.description || transaction.name}
                </Text>
                <Text
                  style={[
                    styles.transactionDate,
                    isDarkTheme && { color: '#94A3B8' },
                  ]}
                >
                  {transaction.date} | {transaction.time}
                </Text>
              </View>
              <View style={styles.transactionAmountContainer}>
                <Text
                  style={[
                    styles.transactionAmount,
                    isDarkTheme && { color: '#FFFFFF' },
                  ]}
                >
                  {transaction.amount}
                </Text>
                <Text
                  style={[
                    styles.transactionLabel,
                    isDarkTheme && { color: '#94A3B8' },
                  ]}
                >
                  {transaction.label}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  balanceSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F1F5F9',
    paddingTop: 40,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  topUpButton: {
    backgroundColor: '#27AE60',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    height: 50,
  },
  topUpText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  transactionHistorySection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  transactionHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#27AE60',
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionIconContainer: {
    marginRight: 15,
  },
  topUpIcon: {
    backgroundColor: '#27AE60',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    color: '#777',
    fontSize: 12,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionLabel: {
    color: '#777',
    fontSize: 12,
  },
});

export default Wallet;
