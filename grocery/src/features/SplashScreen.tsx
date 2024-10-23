import { FC, useEffect } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { Colors } from "../utils/Constants";
import { screenHeight, screenWidth } from "./Scaling";
import Logo from "../../assets/images/splash_logo.jpeg";
import { useAuthStore } from "../state/authStore";
import { resetAndNavigate } from "../utils/NavigationUtil";
import * as Location from "expo-location";
import mmkvStorage from "../state/storage";


const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = await mmkvStorage.getItem('accessToken');

    if (!accessToken) {
      console.log("Switching to CustomerLogin...");
      resetAndNavigate("CustomerLogin");
      return false;
    } else {
      console.log("Access token exists:", accessToken);
      resetAndNavigate("ProductDashboard");
    }
  }

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          Alert.alert("Sorry, we need your location to proceed");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        await tokenCheck();
      } catch (error) {
        console.error("Error fetching location:", error);
        Alert.alert("Sorry, we need your location to proceed");
      }
    }

    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} alt="Logo" style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: screenWidth,
    height: screenHeight * 0.3
  }
});

export default SplashScreen;
