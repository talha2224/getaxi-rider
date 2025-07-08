import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const Final = () => {
  
    const greenColor = '#2ECC71';

  const handleBookRide = () => {
    router.push("/home")
    console.log('Book a ride pressed');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.iconContainer}>
        <View style={[styles.circle, { backgroundColor: greenColor }]}>
          <AntDesign name="check" size={60} color="white" />
        </View>
      </View>

      <Text style={styles.title}>You're All Set!</Text>
      <Text style={styles.subtitle}>Start booking rides and sending parcels.</Text>

      <TouchableOpacity style={[styles.bookRideButton, { backgroundColor: greenColor }]} onPress={handleBookRide}>
        <Text style={styles.bookRideText}>Book a ride</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  bookRideButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  bookRideText: {
    color: 'white',
  },
});

export default Final;