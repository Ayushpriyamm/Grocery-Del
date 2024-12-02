import { Dispatch, FC, SetStateAction } from "react";
import CustomText from "./CustomText";
import { View,Image, StyleSheet, Animated} from "react-native";
import { Fonts } from "../utils/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface SideBarCardProps {
  name : string,
  image : any,
  category : number,
  setCategory : Dispatch<SetStateAction<number>>,
  active : boolean
}


export const SideBarCard : FC<SideBarCardProps> = ({name,image,active,setCategory,category}) =>{
  return(
    <TouchableOpacity onPress={() => setCategory(category)} activeOpacity={1}  style={[styles.card]}>
      <View style={styles.imageContainer}>
     <Animated.Image source={image}  style={[styles.image,,active ?  {backgroundColor : 'green'} : {backgroundColor : 'gray'}]} />
      <CustomText
        variant="h9"
          style={[{ textAlign : "center" }]} 
          fontSize={RFValue(7)}
          fontFamily={Fonts.SemiBold}>
        {name}
      </CustomText>
      </View>
    </TouchableOpacity>
  )
}

export default SideBarCard;

const styles = StyleSheet.create({
  card : {
    padding : 5,
    height : 100,
    paddingVertical : 0,
    justifyContent : 'center',
    alignItems : 'center',
    width : '100%',
      borderRadius : 100
  },
  imageContainer : {
    borderRadius : 100,
    height : '70%',
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#F3F47',
    overflow : 'hidden'
  },
  slectedImageContainer : {
    backgroundColor : '#CFFDB'
  },
  indicator : {
    position : 'absolute',
    right : 0,
    width : 4,
    top : 10,
    alignSelf : 'center',
    color : 'green',
    borderRadius : 15,
  },
  image : {
    height : '80%',
     resizeMode : 'contain', 
    width : '80%',
  }
})
