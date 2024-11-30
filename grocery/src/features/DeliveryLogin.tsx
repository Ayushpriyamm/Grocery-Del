import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomSafeAreaView from './CustomSafeAreaView';
import { ScrollView } from 'react-native-gesture-handler';
import { screenHeight } from './Scaling';
import LottieView from 'lottie-react-native';
import CustomText from './CustomText';
import { Fonts } from '../utils/Constants';
import CustomInput from './CustomInput';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from './CustomButton';
import Entypo from '@expo/vector-icons/Entypo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async () => {

  }
  return (
    <GestureHandlerRootView style={style.container}>
      <CustomSafeAreaView>
        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          <View style={style.container}>
            <View style={style.lottieContainer}>
         {/* <LottieView autoPlay loop style={style.lottie} source={require('../../assets/animations/delivery_man.json')} /> */}
            </View>
            <CustomText variant='h3' style={style.text} fontFamily={Fonts.SemiBold}>
              Faster than Flashing
            </CustomText>
            <CustomInput
              onChangeText={setEmail}
              value={email}
              left={<MaterialIcons name="email" size={RFValue(18)} color="#F8890EA" style={{ marginLeft: 10 }} />
              }
              placeholder='Email'
              inputMode='email'
              right={false}
            />
            <CustomInput
              onChangeText={setPassword}
              value={password}
              left={
                <Entypo name="key" size={RFValue(18)} s color="black" style={{ marginLeft: 10 }} />
              }
              placeholder='Password'
              inputMode='email'
              right={false}
            />
            <CustomButton
              onPress={() => handleLogin()}
              title='Continue'
              loading={loading}
              disabled={!email?.includes('@')}
            />
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
}
export default DeliveryLogin;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  lottie: {
    height: '100%',
    width: '100%'
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%'
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
  }
})
