import { FC, useEffect, useRef } from "react";
import {  StyleSheet, Animated as RNAnimated,View } from "react-native";
import NoticeAnimation from "./NoticeAnimation";
import { NoticeHeight, screenHeight } from "./Scaling";
import { SafeAreaView } from "react-native-safe-area-context";
import Visuals from "./Visuals";
import AnimatedHeader from "./AnimatedHeader";
import StickSearchBar from "./StickSerachBar";
import ScrollX from "./ScrollY";
import ProductCard from "@/src/features/ProductCard";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../utils/Constants";
import { imageData } from "../utils/dummyData";
import CategoryCard from "./CategoryCard";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

export const ProductDashboard: FC = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      duration: 1200,
      toValue: NOTICE_HEIGHT - 20,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      duration: 1200,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, []);
  const showNotice = () => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500)
    return () => clearTimeout(timeoutId);
  }
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <AnimatedHeader showNotice={showNotice} />
        <StickSearchBar />
         <View style={[styles.text,{
        }]}>
            <CustomText
            variant="h1"
            fontFamily={Fonts.SemiBold}
            fontSize={RFValue(12)}>
            Most Buyed Products
           </CustomText>
          <CustomText 
            variant="h6"
            style={styles.viewmore}>
            View More
          </CustomText>
        </View>
         <ScrollX>
          <View style={styles.panelContainer}> 
           {Array.from({length : 7}).map((_,index) =>{
             return <ProductCard 
                name={"Product Name"} 
                image={"../../assets/products/3.png"}
                price={45}
                key={index} />
           })}
          </View>
        </ScrollX>
        <CustomText
        variant="h1"
          style={[{
            paddingHorizontal : 4,
          }]}
        fontFamily={Fonts.SemiBold}
        fontSize={RFValue(15)}>
            Shop By Categories
         </CustomText>
        <ScrollX> 
           <View style={styles.panelContainer}> 
            {Array.from({length : 7}).map((_,index) =>{
              return  <CategoryCard
                key={index} 
                name="CategoryName"
                path={"../../assets/products/5.png"} 
              />
            })}
           </View>
        </ScrollX> 
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flexDirection : 'row',
    gap : 4,
    alignItems : 'center',
    justifyContent : 'center',
    height : screenHeight  * 0.25,
  },
  viewmore : {
     color : 'green',
    borderBottomWidth : 2,
    borderColor : 'green',
  },
  text : {
    flexDirection : 'row',
    marginTop : 40,
    padding : 10,
    justifyContent : 'space-between'
  },
  transparent: {
    padding: 10,
    backgroundColor: "transparent",
  },
});

export default ProductDashboard;
