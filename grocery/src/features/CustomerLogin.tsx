import CustomSafeAreaView from '@/src/features/CustomSafeAreaView';
import ProductSlider from '@/src/features/ProductSlider';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated, SafeAreaView, Keyboard } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";
import { navigate, resetAndNavigate } from '../utils/NavigationUtil';
import CustomInput from './CustomInput';
import CustomText from './CustomText';
import { Fonts, lightColors } from '../utils/Constants';
import { useFonts } from 'expo-font';
import CustomButton from './CustomButton';
import useKeyboardOffsetHeight from '@/hooks/useKeyboardOffsetHeight';
import { Colors } from '../../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import mmkvStorage from '../state/storage';
import { useMutation } from '@tanstack/react-query';
import { postData } from '../utils/apiHandler';
import { authRoutes } from '../utils/apiRoutes';
import axios from 'axios';



export const CustomerLogin: FC = () => {
  const [phoneNo, setphoneNo] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, []);
  const signin = useMutation({
    mutationKey : ["signin"],
    mutationFn : async () => {
      const body  = {
        mobile : `+91 ${phoneNo}`
      }
      return await postData("/api/otp/send-otp",{},body);
    },
    onSuccess : (data : any) => {
      console.log(data?.data,"onSuccess");
      setLoading(false);
      resetAndNavigate('LoginOtp');
      mmkvStorage.setItem('phone',phoneNo);
    },
    onError : (error : any) => {
      console.log(error,"Error");
    }
  });
  const handleAuth = async () => {
    //setLoading(true);

    //signin.mutate();  

    resetAndNavigate("ProductDashboard"); 
  }
  const [gestureSequence, setgestureSeuquence] = useState<string[]>([]);
  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state == State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = ''
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      console.log(direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setgestureSeuquence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setgestureSeuquence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  }
  const [loaded, error] = useFonts({
    'Okra-Regular': require('../../assets/fonts/Okra-Regular.ttf'),
    'Okra-Bold': require('../../assets/fonts/Okra-ExtraBold.ttf'),
    'Okra-SemiBold': require('../../assets/fonts/Okra-MediumLight.ttf'),
    'Okra-Medium': require('../../assets/fonts/Okra-MediumLight.ttf'),
  });
  const bottomColors = [...lightColors].reverse();
  if (loaded) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
          <CustomSafeAreaView>
            <ProductSlider />
            <PanGestureHandler onHandlerStateChange={handleGesture}>
              <Animated.ScrollView
                bounces={false}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.subContainer}
                style={{
                  transform: [{
                    translateY: animatedValue
                  }]
                }}
                keyboardDismissMode={'on-drag'}>
                <LinearGradient colors={bottomColors} style={styles.gradient} />
                <View style={styles.content}>
                  <Image source={require('../../assets/images/baskteryLogo.png')} style={styles.logo} />
                  <CustomText variant='h2' fontFamily={Fonts.SemiBold}>
                    India's last minute app
                  </CustomText>
                  <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                    Login or Signup
                  </CustomText>
                  <CustomInput onChangeText={(text) => {
                    setphoneNo(text.slice(0, 10))
                  }}
                    onClear={() => setphoneNo('')}
                    value={phoneNo}
                    left={
                      <CustomText
                        style={styles.phoneText} variant='h6' fontFamily={Fonts.SemiBold}
                      >
                        +91
                      </CustomText>
                    }
                    placeholder='Enter mobile number'
                    inputMode='numeric'
                  />
                  <CustomButton
                    onPress={() => handleAuth()}
                    title='Continue'
                    loading={loading}
                    disabled={phoneNo?.length != 10}
                  />
                </View>
              </Animated.ScrollView>
            </PanGestureHandler>
          </CustomSafeAreaView>
          <View style={styles.footer}>
            <SafeAreaView>
              <CustomText fontFamily={Fonts.Regular} fontSize={RFValue(7)}>
                By Continuting,you agree to our Terms of Service & Privacy Policy
              </CustomText>
            </SafeAreaView>
          </View>
        </View>
      </GestureHandlerRootView>
    );
  } else {
    return null;
  }
}
export default CustomerLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  phoneText: {
    marginLeft: 10
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-end'
  },
  gradient: {
    paddingTop: 60,
    width: '100%'
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%'
  }
})

