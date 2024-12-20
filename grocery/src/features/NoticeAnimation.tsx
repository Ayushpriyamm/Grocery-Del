import React, { FC } from 'react';
import { View, StyleSheet, Animated as RNAnimated } from 'react-native';
import { NoticeHeight } from './Scaling';
import Notice from './Notice';
interface NoticeAnimationProps {
  noticePosition: any;
  active : boolean;
  children: React.ReactElement
}


const NOTICE_HEIGHT = -(NoticeHeight + 12)

export const NoticeAnimation: FC<NoticeAnimationProps> = ({ noticePosition,active, children }) => {
  return (
    <View style={[styles.container, active ? { backgroundColor: "#C5C6D0" } : { backgroundColor: "transparent" }]}>
      <RNAnimated.View style={[styles.noticeContainer, {
        transform: [{
          translateY: noticePosition
        }]
      }]}>
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View style={[styles.contentContainer, {
        paddingTop: noticePosition.interpolate({
          inputRange: [NOTICE_HEIGHT, 0],
          outputRange: [0, NOTICE_HEIGHT + 20]
        })
      }]}>
        {children}
      </RNAnimated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
export default NoticeAnimation;

