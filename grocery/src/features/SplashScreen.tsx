import { FC, useEffect,useRef } from "react";
import { View, StyleSheet, Image, Text, Alert ,Animated} from "react-native";
import { Colors } from "../utils/Constants";
import { screenHeight, screenWidth } from "./Scaling";
import Logo from "../../assets/images/basketrylogo.png";
import { useAuthStore } from "../state/authStore";
import { resetAndNavigate } from "../utils/NavigationUtil";
import * as Location from "expo-location";
import mmkvStorage from "../state/storage";


const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;

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
         setTimeout(async () => {
          await tokenCheck();
        }, 3000);
      } catch (error) {
        console.error("Error fetching location:", error);
        Alert.alert("Sorry, we need your location to proceed");
      }
    }

     Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 1000, // 1 seconds for fade-in
      useNativeDriver: true, // Optimizes performance
    }).start();

    const timeoutId = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeoutId);
  }, [fadeAnim]);
  return (
    <View style={styles.container}>
      <Image source={Logo} alt="Logo" style={styles.logoImage} />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Your Daily Essentials, Delivered with Care.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#528357",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: screenWidth*0.8,
    height: screenHeight * 0.1,
    resizeMode: 'contain',
    paddingHorizontal: 10
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default SplashScreen;
