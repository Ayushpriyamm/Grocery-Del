import { FC } from "react";
import CustomText from "./CustomText";
import { View,Image, StyleSheet} from "react-native";
import { Fonts } from "../utils/Constants";

interface SideBarCardProps {
  name : string,
  image : any,
  active : boolean
}


export const SideBarCard : FC<SideBarCardProps> = ({name,image,active}) =>{
  return(
    <View style={[styles.card,active ?  {backgroundColor : 'green'} : {backgroundColor : 'gray'}]}>
     <Image source={image}  style={styles.image} />
      <CustomText variant="h9" fontFamily={Fonts.SemiBold}>
        {name}
      </CustomText>
    </View>
  )
}

export default SideBarCard;

const styles = StyleSheet.create({
  card : {
    width : 70,
    display : 'flex',
    alignItems :'center',
    justifyContent : 'center',
    flexDirection : 'column'
  },
  image : {
    height : 70,
    width : 70,
    borderRadius : 100
  }
})
