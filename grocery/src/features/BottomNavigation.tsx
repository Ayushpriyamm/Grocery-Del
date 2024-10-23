import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../utils/Constants";
import { useState } from "react";
import { push, resetAndNavigate } from "../utils/NavigationUtil";

export const BottomNavigation = () => {
  const [active,setActive] = useState<string>("ProductDashboard");
  const handleNavigation = (name : string) => {
    setActive(name);
    push(name);
  }
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => handleNavigation("ProductDashboard")} style={styles.bottomItemView}>
         <AntDesign name="home" size={24} color={active === "ProductDashboard"  ? "#FFAA02" : "black"} />
        <CustomText fontSize={RFValue(12)} fontFamily={Fonts.SemiBold}>Home</CustomText> 
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => handleNavigation("Search")} style={styles.bottomItemView}>
        <AntDesign name="search1" size={24} color={active === "Search" ? "#FFAA02" : "black"} />
        <CustomText fontSize={RFValue(12)} fontFamily={Fonts.SemiBold}>Search</CustomText> 
      </TouchableOpacity>
     <TouchableOpacity onPress={() => handleNavigation("Orders")} style={styles.bottomItemView}>
       <Feather name="shopping-bag" size={24} color={active === "Orders" ? "#FFAA02" : "black"} />
       <CustomText fontSize={RFValue(12)} fontFamily={Fonts.SemiBold}>My Orders</CustomText> 
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: "100%",
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  bottomItemView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomItemText: {
    color: '#696969',
    marginTop: 4,
  },
});
