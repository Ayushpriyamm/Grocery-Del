import { StyleSheet } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { SearchBar } from "./SearchBar";

const StickSearchBar = () => {
  return (
    <Animated.View style={styles.parent}>
      <SearchBar />
      <Animated.View style={[styles.shadow]} />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  parent: {
    marginTop : 40,
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    height: 5,
    width: '100%',
  }
});
export default StickSearchBar;
