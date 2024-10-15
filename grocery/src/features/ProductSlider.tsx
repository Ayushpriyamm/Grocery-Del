import React, { useMemo, FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { imageData } from "../utils/dummyData";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { screenHeight, screenWidth } from "./Scaling";

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
        <View style={styles.gridContainer}>
          {rows.map((row, index) => (
            <MemoizedRow key={index} row={row} rowIndex={index} />
          ))}
        </View>
      </AutoScroll>
    </View>
  );
};

export default ProductSlider;

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
  return (
    <View key={rowIndex} style={styles.row}>
      {row.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View key={imageIndex} style={[styles.itemContainer, {
            transform: [{
              translateX: horizontalShift
            }]
          }]}>
            <Image source={image} style={styles.image} />
          </View>
        )
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenHeight * 0.15,
    backgroundColor: "#e9f7f8",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
  autoScroll: {
    position: 'absolute',
    height: screenHeight,
    zIndex: -2
  },
  gridContainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  }
});
