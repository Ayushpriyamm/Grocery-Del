import React, { FC, useEffect, useRef, useState } from "react"
import CustomText from "./CustomText"; 
import { View,ScrollView,StyleSheet, Animated, useAnimatedValue } from "react-native";
import { Fonts } from "../utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import SideBarCard from "./SideBarCard";
import { screenHeight, screenWidth } from "./Scaling";
import { useSharedValue } from "react-native-reanimated";
import { categories } from "../utils/dummyData";

interface ProductCategoryProps {
  product : string;
}


export const ProductCategory : FC<ProductCategoryProps> = ({product}) => {
  const scrollRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = categories.map(() => useSharedValue(0));
const [categoryId,setcategoryId] = useState<number>(9);
  return(
  <>
       <View style={styles.sideBar}>
        <ScrollView ref={scrollRef} contentContainerStyle={{paddingTop : 50}} showsVerticalScrollIndicator={false}>
          <Animated.View>
            {categories.map((data : any,index : number) => {
                return <SideBarCard category={categoryId} setCategory={setcategoryId} key={index} name={product} image={data.image} active={true} />
            })}
          </Animated.View>
        </ScrollView>
      </View>
     </>
  );
}
const styles = StyleSheet.create({
  sideBar : {
    width : "15%", 
    backgroundColor : '#fff',
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
