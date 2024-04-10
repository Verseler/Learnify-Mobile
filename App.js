import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

import theme from "./utils/theme";
import useStore from "./hooks/useStore";
import { getSecureStore } from "./utils/SecureStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Course from "./pages/Course";

const Stack = createNativeStackNavigator();

export default function App() {
  const userIsAuthenticated = useStore((state) => state.userIsAuthenticated);
  const signIn = useStore((state) => state.signIn);

  //if token exist then signIn user
  useEffect(() => {
    const userToken = getSecureStore("userToken");
    if (userToken) {
      signIn(userToken);
    }
  }, []);

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
            <>
              <Stack.Screen name="LandingPage" component={LandingPage} />
              <Stack.Screen name="Course" component={Course} />
            </>
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
