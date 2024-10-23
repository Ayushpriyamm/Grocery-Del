import React, { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NoticeHeight } from './Scaling';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from './CustomText';
import { Fonts } from '../utils/Constants';
import { wavyData } from '../utils/dummyData';
import { Svg, Path, Defs, G, Use } from "react-native-svg";



export const Notice = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView>
            <CustomText style={styles.heading} variant='h8' fontFamily={Fonts.SemiBold}>
              Its raining near this location
            </CustomText>
            <CustomText variant='h9' style={styles.textCenter}>
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width='100%'
        height='35'
        fill='#CCD5E4'
        style={styles.wave}
        viewBox='0 0 4000 1000'
        preserveAspectRatio='none'
      >
        <Defs>
          <Path id='wavepath' d={wavyData} />
        </Defs>
        <G>
          <Use href='#wavepath' y="321" />
        </G>
      </Svg>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4'
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8
  },
  heading: {
    color: '#2D3875',
    textAlign: 'center',
    marginBottom: 8
  },
  wave: {
    width: '100%',
    marginTop: 6,
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  }
})
export default Notice;

