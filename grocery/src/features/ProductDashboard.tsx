import { FC, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Animated as RNAnimated, View,Button, ScrollView } from "react-native";
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
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

export const ProductDashboard: FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
 const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
 const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
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

   return (
    <BottomSheetModalProvider>
      <NoticeAnimation noticePosition={noticePosition}>
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
                    active={active}
                    setActive={setActive}
                    name={data.name}
                    path={data.image} 
                  /> 
              ))}
            </View>
          </ScrollX>  
        </View>
      </ScrollView>
       <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView>
            <CustomText>Awesome 🎉</CustomText>
          </BottomSheetView>
        </BottomSheetModal>
      <BottomNavigation />

    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
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
