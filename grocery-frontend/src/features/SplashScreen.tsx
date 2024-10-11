import { FC } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { screenHeight, screenWidth } from "./Scaling";
import Logo from "../../assets/assets/images/splash_logo.jpeg";

const SplashScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} alt="Logo" style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: screenWidth,
    height: screenHeight
  }
});

export default SplashScreen;

