import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import SplashScreen from "../features/SplashScreen";

const Stack = createNativeStackNavigator();


const Navigation: FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;
