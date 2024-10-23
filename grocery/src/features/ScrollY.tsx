import React,{ FC } from "react"
import { StyleSheet,ScrollView } from "react-native";
import { screenWidth } from "./Scaling";


export const ScrollX: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ScrollView horizontal={true} style={styles.container}>
      {children}
    </ScrollView>
  );
}
export default ScrollX;
const styles = StyleSheet.create({
   container : {
    flexDirection : 'row',
    gap : 4,
    width : screenWidth,
  }
});

