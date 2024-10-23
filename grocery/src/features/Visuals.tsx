import { StyleSheet, Text, Animated, Image } from 'react-native'
import React, { FC } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { darkWeatherColors } from '../utils/Constants'
import { screenHeight, screenWidth } from './Scaling'
import LottieView from 'lottie-react-native'

export const Visuals: FC = () => {
  return (
    <Animated.View style={[styles.container]}>
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <Image source={require('../../assets/images/cloud.png')} style={styles.cloud} />
      <LottieView autoPlay={true} enableSafeModeAndroid={true} loop={true} style={styles.lottie} source={require("../../assets/animations/raining.json")} />
    </Animated.View >
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  lottie: {
    width: '100%',
    height: 150,
    position: 'absolute',
    transform: [{
      scaleX: -1
    }]
  },
  gradient: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'absolute'
  },
  cloud: {
    width: screenWidth,
    resizeMode: 'center',
    height: 100
  }
})
export default Visuals;
