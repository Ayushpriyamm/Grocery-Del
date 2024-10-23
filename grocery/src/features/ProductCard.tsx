import { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../utils/Constants";
import Animated from "react-native-reanimated";


interface ProductCardProps {
  name : string,
  image : any,
  price: number
}

export const ProductCard: FC<ProductCardProps> = ({name,image,price}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleBuy = () => {
    setDisabled(true);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={image} style={styles.image} />
      <CustomText fontSize={RFValue(10)} variant="h3" fontFamily={Fonts.SemiBold}>{name}</CustomText>
      <CustomText>200g</CustomText>
      <View style={styles.subcontainer}>
        <CustomText style={styles.price} fontSize={RFValue(8)} fontFamily={Fonts.Medium}>Rs {price}</CustomText>
        <TouchableOpacity onPress={() => handleBuy()} disabled={disabled} activeOpacity={1} style={styles.btn}>
          {loading ? (
            <ActivityIndicator color={'white'} size='small' />
          ) : (
            <CustomText style={{ color: 'white' }} variant="body" fontSize={RFValue(8)} fontFamily={Fonts.Medium}>
              Add
            </CustomText>
          )}
        </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    color: 'green',
  },
  btn: {
    height: 20,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 20,
  },
  subcontainer: {
    paddingHorizontal: 4,
    alignItems : 'center',
    justifyContent : 'space-between',
    gap : 2,
    flexDirection: "row",
  },
  image: {
    height: 90,
    elevation: 9,
    width: 100,
    borderRadius : 15,
    backgroundColor : '#FAFAFA',
  },
  container: {
    flexDirection: 'column',
    height: 180,
    gap: 2,
    borderRadius : 2,
    width: 100,
    shadowColor : 'green',
    shadowOffset : {
      width : 1,
      height : 1
    },
    elevation  : .1,
    shadowRadius : 1,
  },
});

export default ProductCard;
