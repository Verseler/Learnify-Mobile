import { StyleSheet, Image } from "react-native";
import { Appbar } from "react-native-paper";

export default function AppBar({ navigation }) {
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Image style={styles.logo} source={require("../assets/Icons/Logo.png")} />
      <Appbar.Content title="Learnify" titleStyle={styles.title} />
      <Appbar.Action
        size={40}
        color={theme.colors.primary}
        icon="account-circle"
        onPress={() => {}}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold" 
  },
  logo: {
    height: 50,
    width: 50,
    marginStart: 6,
    marginEnd: 10,
    objectFit: "contain",
  },
})
