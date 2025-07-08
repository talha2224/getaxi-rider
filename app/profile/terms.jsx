import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Terms = () => {
  const [agreed, setAgreed] = useState(false);
  const greenColor = '#2ECC71';
  const progressBackgroundColor = '#F1F5F9';

  const handleAgreementToggle = () => {
    setAgreed(!agreed);
  };

  const handleProceed = () => {
    if (agreed) {
      console.log('Terms agreed. Proceeding...');
      router.push("/profile/final")
    }
    else {
      alert('Please agree to the terms and conditions to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBackground, { backgroundColor: progressBackgroundColor }]}>
          <View style={[styles.progressBarFill, { backgroundColor: greenColor, width: '100%' }]} />
        </View>
        <Text style={styles.stepText}>Step 5 of 5</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Terms and conditions</Text>
        <Text style={styles.subtitle}>Review our terms and conditions</Text>

        <ScrollView style={styles.termsTextContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.termsHeading}>1. Account Registration</Text>
          <Text style={styles.termsParagraph}>By creating an account, you agree to provide accurate information and keep your login details secure.</Text>

          <Text style={styles.termsHeading}>2. Service Usage</Text>
          <Text style={styles.termsParagraph}>You agree to use the app for legal purposes only, including booking rides and sending parcels. Any misuse may result in account suspension.</Text>

          <Text style={styles.termsHeading}>3. Payments & Refunds</Text>
          <Text style={styles.termsParagraph}>All payments via Liqpay are final. Refunds for canceled trips are subject to our policy. Cash payments are made directly to the driver.</Text>

          <Text style={styles.termsHeading}>4. Privacy & Data Protection</Text>
          <Text style={styles.termsParagraph}>We collect and store necessary information to provide our services. Your data will not be shared without consent, except as required by law.</Text>

          <Text style={styles.termsHeading}>5. Liability</Text>
          <Text style={styles.termsParagraph}>We are not responsible for lost items, service delays, or disputes between users and drivers.</Text>

          <Text style={styles.termsHeading}>6. Updates & Changes</Text>
          <Text style={styles.termsParagraph}>We may update these terms periodically. Continued use of the app means you accept any changes.</Text>

          <Text style={styles.termsHeading}>7. Contact</Text>
          <Text style={styles.termsParagraph}>For support, reach out via [customer support email/phone].</Text>
          
          <TouchableOpacity style={styles.agreementContainer} onPress={handleAgreementToggle}>
            <AntDesign name={agreed ? 'checkcircle' : 'checkcircleo'} size={15} color={agreed ? greenColor : 'gray'} style={styles.agreementCheckbox} />
            <Text style={styles.agreementText}>By signing up, you agree to these <Text style={{ fontWeight: 'bold' }}>terms</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.proceedButton, { backgroundColor: greenColor, opacity: agreed ? 1 : 0.5 }]} onPress={handleProceed} disabled={!agreed}>
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:70,
    paddingHorizontal: 30,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 5,
    borderRadius: 100,
  },
  progressBarFill: {
    height: 5,
    borderRadius: 100,
  },
  stepText: {
    color: '#475569',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    color: '#777',
    fontSize: 16,
    marginBottom: 20,
  },
  termsTextContainer: {
    flexGrow: 1,
    marginBottom: 20,
  },
  termsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  termsParagraph: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  agreementCheckbox: {
    marginRight: 10,
  },
  agreementText: {
    color: '#333',
  },
  proceedButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 100
  },
  proceedButtonText: {
    color: 'white',
  },
});

export default Terms;