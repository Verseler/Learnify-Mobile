import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState, createContext } from "react";

import theme from "./utils/theme";
import { getItem, deleteItem, setItem } from "./utils/SecureStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";

const Stack = createNativeStackNavigator();

export default function App() {
  const userTokenExist = getItem("userToken");

  // console.log(userTokenExist)
  // const AuthContext = createContext(null);
  // const [userTokenExist, setUserTokenExist] = useState(null);

  // useEffect(() => {
  //   const userToken = getItem("userToken");
  //   if (userToken) setUserTokenExist(true);
  // }, []);

  // const authContext = useMemo(
  //   () => ({
  //     signIn: (data) => {},
  //     signOut: () => {},
  //     signUp: () => {
  //       setItem("userToken", "123");
  //       setUserTokenExist(true);
  //     },
  //   }),
  //   []
  // );

  return (
    <Signup />
    // <PaperProvider theme={theme}>
    //   {/* <AuthContext.Provider value={authContext}> */}
    //     <NavigationContainer>
    //       <Stack.Navigator
    //         screenOptions={{
    //           headerShown: false,
    //           animation: "fade",
    //         }}
    //       >
    //         {userTokenExist != null ? (
    //           <Stack.Screen name="LandingPage" component={LandingPage} />
    //         ) : (
    //           <>
    //             <Stack.Screen name="Login" component={Login} />
    //             <Stack.Screen name="Signup" component={Signup} />
    //           </>
    //         )}
    //       </Stack.Navigator>
    //     </NavigationContainer>

    //     <StatusBar style="auto" />
    //   {/* </AuthContext.Provider> */}
    // </PaperProvider>
  );
}
