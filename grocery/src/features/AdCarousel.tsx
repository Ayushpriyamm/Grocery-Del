import { StyleSheet, View, Image } from "react-native";
import React, { useRef, useEffect } from "react";
import PagerView from 'react-native-pager-view';
import { adData } from "../utils/dummyData";

export const AdCarousel = () => {
  const pagerRef = useRef<PagerView>(null);
  const totalPages = adData.length;
  let currentPage = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerRef.current) {
        currentPage = (currentPage + 1) % totalPages; 
        pagerRef.current.setPage(currentPage);
      }
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <View style={styles.container}>
      <PagerView ref={pagerRef}  style={styles.imageContainer} initialPage={0}>
        {adData.map((data: any, key: number) => (
          <View key={key}>
            <Image style={styles.img} source={data} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin : 4,
    height: '25%',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default AdCarousel;
