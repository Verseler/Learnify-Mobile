import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

import theme from "./utils/theme";
import useStore from "./hooks/useStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";

const Stack = createNativeStackNavigator();

export default function App() {
  const userIsAuthenticated = useStore((state) => state.userIsAuthenticated);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          {userIsAuthenticated ? (
            <Stack.Screen name="LandingPage" component={LandingPage} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
