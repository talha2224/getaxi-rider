import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-get-random-values';
import 'react-native-reanimated';
import { ThemeProviderContext } from '../hooks/themeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProviderContext>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* No need to repeat headerShown: false now */}
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="social" />
        <Stack.Screen name="forgot/index" />
        <Stack.Screen name="forgot/otp" />
        <Stack.Screen name="forgot/password" />
        <Stack.Screen name="forgot/final" />
        <Stack.Screen name="profile/index" />
        <Stack.Screen name="profile/name" />
        <Stack.Screen name="profile/language" />
        <Stack.Screen name="profile/payment" />
        <Stack.Screen name="profile/terms" />
        <Stack.Screen name="profile/final" />
        <Stack.Screen name="home/index" />
        <Stack.Screen name="home/rate" />
        <Stack.Screen name="home/tip" />
        <Stack.Screen name="home/search" />
        <Stack.Screen name="home/receipt" />
        <Stack.Screen name="home/notification" />
        <Stack.Screen name="home/chats" />
        <Stack.Screen name="home/msg" />
        <Stack.Screen name="home/bookings" />
        <Stack.Screen name="home/wallet" />
        <Stack.Screen name="home/topup" />
        <Stack.Screen name="home/payment" />
        <Stack.Screen name="home/profile" />
        <Stack.Screen name="home/edit" />
        <Stack.Screen name="home/favorite" />
        <Stack.Screen name="home/notificationsettings" />
        <Stack.Screen name="home/language" />
        <Stack.Screen name="home/security" />
        <Stack.Screen name="home/support" />
        <Stack.Screen name="home/delivery" />
        <Stack.Screen name="home/map" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProviderContext>
  );
}
