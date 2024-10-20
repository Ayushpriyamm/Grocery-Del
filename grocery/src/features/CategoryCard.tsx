import { View, Image, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../utils/Constants";
import { FC } from "react";

interface CategoryCardProps {
  name: string;
  path: any; 
}

export const CategoryCard: FC<CategoryCardProps> = ({ name, path }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/category/1.png")} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <CustomText
        variant="h5"
        fontSize={RFValue(8)}
        fontFamily={Fonts.SemiBold}
      >
        {name}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(90),
    height: RFValue(90),
    overflow: "hidden",
  },
  image: {
    width: 80,
    borderRadius: RFValue(60),
    height: 80,
  }
});

export default CategoryCard;
