import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const SplashScreen: FC = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
  },
});

export default SplashScreen;

