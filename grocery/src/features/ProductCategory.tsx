import React, { FC } from "react"
import CustomText from "./CustomText"; 
import { View,ScrollView,StyleSheet } from "react-native";
import { Fonts } from "../utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import SideBarCard from "./SideBarCard";
import { screenHeight } from "./Scaling";

interface ProductCategoryProps {
  product : string;
}


export const ProductCategory : FC<ProductCategoryProps> = ({product}) => {
  return(
  <>
  <CustomText variant="h1" style={[{
              textAlign : "center"
            }]}
            fontSize={RFValue(12)}
            fontFamily={Fonts.SemiBold}>
              {product} 
          </CustomText> 
          <View style={styles.screenFlex}>
              <ScrollView scrollEnabled={true} style={[
                {
                  flexDirection : "column",
                  zIndex : 100,
                  gap : 40,
                  height : screenHeight,
                }
              ]}>
               <SideBarCard active={true} name={product} image={require("../../assets/category/1.png")}/>             
               <SideBarCard active={false} name={product} image={require("../../assets/category/1.png")}/> 
              </ScrollView>
              <ScrollView>
                <CustomText>Side 2</CustomText>
              </ScrollView>
          </View>
    </>
  );
}
const styles = StyleSheet.create({
   screenFlex : {
    display: 'flex',
    flexDirection : "row"
  },
})
