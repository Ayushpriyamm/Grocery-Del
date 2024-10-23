import {  Image, StyleSheet,TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "../utils/Constants";
import { FC} from "react";




interface CategoryCardProps {
  name: string;
  path: any; 
  onPress: (present : any) => void;
}

export const CategoryCard: FC<CategoryCardProps> = ({ name,onPress, path }) => {

  return (
    <>
    <TouchableOpacity style={styles.container} onPress={(product : any) => onPress(product)}>
      <Image 
        source={path} 
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
    </TouchableOpacity> 

    </>
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
    width: 60,
    borderRadius: RFValue(60),
    height: 60,
  }
});

export default CategoryCard;
