import { FC } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import CustomText from "./CustomText";
import { Fonts } from "../utils/Constants";
import ParallaxScrollView from "@/components/ParallaxScrollView";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, title, disabled, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8} style={[styles.btn, {
      backgroundColor: disabled ? Colors.disabled : Colors.secondary
    }]}>
      {loading ? <ActivityIndicator color={'white'} size='small' /> :
        <CustomText
          variant="h6" fontFamily={Fonts.SemiBold}
          style={styles.text}>
          {title}
        </CustomText>
      }
    </TouchableOpacity >
  )
}
export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 15,
    borderRadius: 10
  },
  text: {
    color: '#fff'
  }
})
