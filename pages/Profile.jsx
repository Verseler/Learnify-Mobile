import { Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import { getSecureStore } from "../utils/SecureStore";
import useStore from "../hooks/useStore";
import AppBar from "../components/AppBar";

export default function Profile() {
  const signOut = useStore((state) => state.signOut);
  const userToken = getSecureStore("userToken");
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar hasProfileAvatar={true} title="Learnify" />

      <View style={styles.sample}>
        <Text>{userToken}</Text>
        <Button mode="contained" onPress={signOut}>
          Signout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sample: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
