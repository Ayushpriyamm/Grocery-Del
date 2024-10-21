import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import SplashScreen from "../features/SplashScreen";
import CustomerLogin from "../features/CustomerLogin";
import DeliveryLogin from "../features/DeliveryLogin";
import { navigationRef } from "../utils/NavigationUtil";
import ProductDashboard from "../features/ProductDashboard";
import DeliveryDashboard from "../features/DeliveryDashboard";


const Stack = createNativeStackNavigator();


const Navigation: FC = () => {
  return (

  <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{
            animation: 'fade'
          }}
          name="CustomerLogin" component={CustomerLogin} />
        <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
        <Stack.Screen
          options={{
            animation: 'fade'
          }}
          name="DeliveryLogin"
          component={DeliveryLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;
