import React, { FC, useRef } from "react"
import CustomText from "./CustomText"; 
import { View,ScrollView,StyleSheet, Animated } from "react-native";
import { Fonts } from "../utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import SideBarCard from "./SideBarCard";
import { screenHeight, screenWidth } from "./Scaling";

interface ProductCategoryProps {
  product : string;
}


export const ProductCategory : FC<ProductCategoryProps> = ({product}) => {
  const scrollRef = useRef<ScrollView>(null);
  return(
  <>
      <CustomText variant="h1" style={[{
              textAlign : "center"
            }]}
            fontSize={RFValue(12)}
            fontFamily={Fonts.SemiBold}>
              {product} 
          </CustomText>
      <View style={styles.sideBar}>
        <ScrollView ref={scrollRef} contentContainerStyle={{paddingTop : 50}} showsVerticalScrollIndicator={false}>
          <Animated.View>
            {Array.from({ length : 40}).map((_ : any,index : number) => {
                return <SideBarCard key={index} name={product} image={require("../../assets/products/1.png")} active={true} />
            })}
          </Animated.View>
        </ScrollView>
      </View>
       </>
  );
}
const styles = StyleSheet.create({
  sideBar : {
    width : "24%",
    backgroundColor : ' #fff',
    borderRightWidth : 0.8,
    borderRightColor : '#eee',
    position : 'relative'
  },
  scrollView : {
   flexDirection : "column",
   zIndex : 999,
   position : 'absolute',
   gap : 40,
   width : screenWidth * 0.3,
   borderRightColor : 'green',
  borderRightWidth : 4,              
  },
   screenFlex : {
    display: 'flex',
    flexDirection : "row"
  },
})
