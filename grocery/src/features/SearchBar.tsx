import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { lightColors } from "../utils/Constants";
import CustomInput from "./CustomInput";

export const SearchBar = () => {
  const [search, setSearch] = useState<any>('');
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <LinearGradient colors={lightColors.reverse()} style={styles.gradient} />
      <CustomInput onChange={(text) => setSearch(text)} onClear={() => setSearch('')}
        value={search} left={
          <AntDesign name="search1" size={RFValue(20)} color="black" />
        }
        placeholder="What do you want"
        inputMode="text"
      />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
 gradient: {
    paddingTop: 1,
    width: '100%'
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    height : 70,
    width: '80%',
  }
})
export default SearchBar;
