import { FC, useEffect, useState } from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { screenHeight } from "./Scaling";
import OtpTextInput from 'react-native-text-input-otp';
import CustomButton from "./CustomButton";
import { Fonts } from "../utils/Constants";
import mmkvStorage from "../state/storage";

export const OtpPage : FC = () =>{
  const [otp, setOtp] = useState('');
  const [phone,setPhone] = useState<string | null>('');
  useEffect(() => {
    async function setItem(){
      const phone   = await mmkvStorage.getItem('phone');
      setPhone(phone);
    }
    setItem();
  },[phone])
  const [loading,setLoading] = useState<boolean>(false);
  const handleAuth = () => {
    setLoading(true);
  }
  return(
    <View style={styles.otpPage}>
      <CustomText
        style={styles.heading}
        fontFamily={Fonts.SemiBold} 
        fontSize={RFValue(20)}>
        Verify your
      </CustomText> 
      <CustomText
        style={styles.heading}
        fontFamily={Fonts.SemiBold}
        fontSize={RFValue(20)}
      >
        Phone Number {phone} </CustomText>
      <CustomText fontSize={RFValue(12)} fontFamily={Fonts.Regular}>Enter your OTP code here</CustomText>
      <OtpTextInput
        styles={styles.otp}
        focussedStyle={styles.input}
        otp={otp}
        fontStyle={styles.input}
        setOtp={setOtp}
        digits={4}
      />
      <CustomText>Didnt you receive any code?</CustomText>
      <CustomText fontFamily={Fonts.SemiBold} style={styles.text}>Resend New Code</CustomText>
       <CustomButton
          onPress={() => handleAuth()}
         title='Submit'
         loading={loading}
         disabled={otp?.length != 4}
      />
 
    </View>
  )
}
const styles = StyleSheet.create({
  heading: {
    textAlign : 'center'
  },
  text : {
     color : 'green', 
  },
  otp: {

    borderRadius: 30,
    padding: 10,
    backgroundColor: '#f0f0f0', 
    borderWidth: 10,
    borderColor: '#ccc', 
  },
  input: {
    borderColor: '#007BFF',
  },
  otpPage : {
    display: 'flex',
    justifyContent : 'center',
    gap : 20,
    padding : 20,
    height : screenHeight,
    alignItems : 'center',
    flexDirection : 'column'
  }
})
export default OtpPage;
