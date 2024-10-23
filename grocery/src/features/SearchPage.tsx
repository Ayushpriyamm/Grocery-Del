import { FC, useRef } from "react";
import { View,StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import Visuals from "./Visuals";
import BottomNavigation from "./BottomNavigation";

export const SearchPage : FC = () => {
  return (
    <>
    <View style={styles.search}>
       <SearchBar />
       <BottomNavigation/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  search : {
    marginTop : 30,
    padding : 10
  }
})

export default SearchPage;
