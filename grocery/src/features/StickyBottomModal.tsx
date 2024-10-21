import React, { FC } from "react"
import { View,Text,StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet,{BottomSheetView} from "@gorhom/bottom-sheet";

interface StickyBottomModalProps {
  onChange : (index : number) => void;
  left : React.ReactNode;
  active : boolean;
  bottomSheetRef : React.RefObject<BottomSheet>;
  children? : React.ReactNode
}


export const StickyBottomModal : FC<StickyBottomModalProps> =  ({bottomSheetRef,active,left,onChange,children}) => {

  return(
    <GestureHandlerRootView>
      {left}
      <BottomSheet ref={bottomSheetRef} onChange={onChange}>
        {active && (
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
        )}
      </BottomSheet>
    </GestureHandlerRootView> 
  )
}

export default StickyBottomModal;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    position : 'absolute',
    height : 600,
    padding: 36,
    alignItems: 'center',
  }
});
