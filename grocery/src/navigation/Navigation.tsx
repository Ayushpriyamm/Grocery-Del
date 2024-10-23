import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import SplashScreen from "../features/SplashScreen";
import CustomerLogin from "../features/CustomerLogin";
import DeliveryLogin from "../features/DeliveryLogin";
import { navigationRef } from "../utils/NavigationUtil";
import ProductDashboard from "../features/ProductDashboard";
import DeliveryDashboard from "../features/DeliveryDashboard";
import SearchPage from "../features/SearchPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();
const Navigation: FC = () => {
  return (
  <QueryClientProvider queryClient={queryClient}>
  <GestureHandlerRootView>
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
        <Stack.Screen name="Search"   component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

export default Navigation;
