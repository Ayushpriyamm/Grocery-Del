import React, { FC } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import { Fonts } from '../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.SemiBold} variant='h8' style={styles.text}>
          Welcome User
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText fontFamily={Fonts.SemiBold} variant='h4' style={styles.text}>
            Get Products in minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn}>
            <CustomText fontSize={RFValue(8)} fontFamily={Fonts.SemiBold} style={
              {
                color: '#3B4886'
              }
            }>
              Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText variant='h8' numberOfLines={1} fontFamily={Fonts.Medium} style={styles.text2}>
            A-1/291 Sector -4 Rohini Delhi
          </CustomText>
          <AntDesign name="caretdown" size={10} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="user-circle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    justifyContent: 'space-between'
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '50%'
  },
  text2: {
    color: '#fff',
    width: '90%',
  },
  noticeBtn: {
    backgroundColor: '#E8EAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2
  },
  text: {
    color: '#ffff'
  }
})
export default Header;

