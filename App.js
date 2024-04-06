import { StatusBar } from "expo-status-bar";
import { StyleSheet, View} from "react-native";
import { PaperProvider } from "react-native-paper";

import theme from "./utils/theme";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {/* <Signup /> */}
        <Login />
        {/* <StatusBar style="auto" /> */}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
});
