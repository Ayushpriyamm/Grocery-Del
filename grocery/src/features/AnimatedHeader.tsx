import { FC } from "react";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import Header from "./Header";
import { View } from "react-native";

interface AnimatedHeaderProps {
  showNotice: () => void;
}

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({ showNotice }) => {
  const { scrollY } = useCollapsibleContext();
  /*
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [0, 1]);
    return { opacity };
  });
*/
  return (
    <View>
      <Header showNotice={showNotice} />
    </View>
  );
};

export default AnimatedHeader;
