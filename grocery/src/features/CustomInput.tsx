import { FC } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors,Fonts } from "../utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import Entypo from '@expo/vector-icons/Entypo';

interface InputProps {
  left: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
}

const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
  onClear,
  left,
  right = true,
  ...props
}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput {...props} style={styles.inputContainer} placeholderTextColor={'#ccc'} />
      <View style={styles.icon}>
        {
          props.value?.length != 0 && right &&
          <TouchableOpacity>
            <Entypo onPress={onClear} name="circle-with-cross" size={RFValue(12)} color="#ccc" />
          </TouchableOpacity>
        }
      </View>
    </View >
  )
}
export default CustomInput;
const styles = StyleSheet.create({
  text: {
    width: '10%',
    marginLeft: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffff',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border
  },
  inputContainer: {
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBottom: 15,
    height: '100%',
    color: Colors.text,
    bottom: -1
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
})
