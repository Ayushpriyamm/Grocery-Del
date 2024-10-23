import { FC, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Animated as RNAnimated, View,Button, ScrollView, Alert } from "react-native";
import NoticeAnimation from "./NoticeAnimation";
import { NoticeHeight, screenHeight, screenWidth } from "./Scaling";
import { SafeAreaView } from "react-native-safe-area-context";
import Visuals from "./Visuals";
import AnimatedHeader from "./AnimatedHeader";
import StickSearchBar from "./StickSerachBar";
import ScrollX from "./ScrollY";
import ProductCard from "@/src/features/ProductCard";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../utils/Constants";
import CategoryCard from "./CategoryCard";
import { AdCarousel } from "./AdCarousel";
import { categories, imageData } from "../utils/dummyData";
import BottomNavigation from "./BottomNavigation";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { SideBarCard } from "./SideBarCard";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

export const ProductDashboard: FC = () => {
  const [active, setActive] = useState<boolean>(false);
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
      toValue: NOTICE_HEIGHT,
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
    }, 3500);
    return () => clearTimeout(timeoutId);
  }
 const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [product,setProduct] = useState<any>(null);
  const handlePresentModalPress = useCallback((p : any) => {
    setProduct(p.name);
    setActive(true);
    console.log(product);
    bottomSheetModalRef.current?.present();
  }, []);
   return (
    <BottomSheetModalProvider>
      <NoticeAnimation active={active} noticePosition={noticePosition}>
        <>
          <Visuals />
          <SafeAreaView />
          <AnimatedHeader showNotice={showNotice} />
          <StickSearchBar />
        </>
      </NoticeAnimation> 
      <ScrollView style={styles.screen}>
        <View style={styles.productContainer}>
          <View style={styles.text}>
            <CustomText
              variant="h1"
              fontFamily={Fonts.SemiBold}
              fontSize={RFValue(12)}>
              Most Buyed Products
            </CustomText>
            <CustomText 
              variant="h6"
              fontSize={RFValue(8)}
              style={styles.viewmore}>
              View More
            </CustomText>
          </View>

          <ScrollX>
            <View style={styles.panelContainer}> 
              {imageData.map((data: any, index: number) => (
                <ProductCard 
                  name={"Product Name"} 
                  image={data}
                  price={45}
                  key={index} 
                />
              ))}
            </View>
          </ScrollX>
        </View>
        <View style={styles.categoryContainer}>
          <CustomText
            variant="h1"
            style={styles.categoryText}
            fontFamily={Fonts.SemiBold}
            fontSize={RFValue(15)}>
            Shop By Categories
          </CustomText>

          <ScrollX> 
            <View style={styles.panelContainer}> 
              {categories.map((data: any, index: any) => ( 
                  <CategoryCard
                    key={index}
                    onPress={() => handlePresentModalPress(data)}
                   name={data.name}
                    path={data.image} 
                  /> 
              ))}
            </View>
          </ScrollX>  
        </View>
      </ScrollView> 
      <BottomNavigation />
      {active && (
      <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.bottomSheet}>
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
          </BottomSheetView>
        </BottomSheetModal>
    )}
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheet : {
    height : screenHeight * 0.8,
  }, 
  screenFlex : {
    display: 'flex',
    flexDirection : "row"
  },
  screen: {
    marginTop: 30,    
  },
  productContainer: {
    flexDirection: 'column',
    height: screenHeight * 0.4,
  },
  categoryContainer: {
    flexDirection: "column",
    height: screenHeight * 0.25,
  },
  panelContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight * 0.25,
  },
  viewmore: {
    color: 'green',
    borderBottomWidth: 0.4,
    borderColor: 'green',
  },
  text: {
    flexDirection: 'row',
    marginTop: 40,
    padding: 10,
    justifyContent: 'space-between',
  },
  categoryText: {
    paddingHorizontal: 4,
  },
});

export default ProductDashboard;
