import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/themeContext';

const BottomNavbar = () => {
  const { isDarkTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute();

  const tabs = [
    {
      link: "home/index",
      name: "Home",
      icon: (color) => <MaterialIcons name="add-home" size={20} color={color} />,
    },
    {
      link: "home/bookings",
      name: "Bookings",
      icon: (color) => <FontAwesome6 name="edit" size={20} color={color} />,
    },
    {
      link: "home/wallet",
      name: "Wallet",
      icon: (color) => <MaterialCommunityIcons name="wallet" size={20} color={color} />,
    },
    {
      link: "home/delivery",
      name: "Delivery",
      icon: (color) => <Feather name="box" size={20} color={color} />,
    },
    {
      link: "home/profile",
      name: "Profile",
      icon: (color) => <FontAwesome5 name="user" size={20} color={color} />,
    },
  ];

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: isDarkTheme ? "#0F172A" : "#fff",
          borderTopColor: isDarkTheme ? "#333" : "rgba(0, 0, 0, 0.1)",
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive =
            (route.name === "home" && tab.link === "home/index") || tab.link === route.name;

          const iconColor = isActive ? "#2ECC71" : isDarkTheme ? "#aaa" : "#8D8C8C";
          const textColor = isActive ? "#2ECC71" : isDarkTheme ? "#aaa" : "#8D8C8C";

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.navItem}
              onPress={() => router.push(tab.link === "home/index" ? "home" : tab.link)}
            >
              {tab.icon(iconColor)}
              <Text
                style={{
                  textAlign: "center",
                  color: textColor,
                  fontWeight: "600",
                  marginTop: 2,
                  fontSize: 12,
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});

export default BottomNavbar;
