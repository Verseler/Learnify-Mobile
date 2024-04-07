import { useState } from "react";
import { BottomNavigation, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { getItem } from "expo-secure-store";

const HomeRoute = () => {
  const token = getItem("userToken");

  return (
    <View style={styles.sample}>
      <Text>Music</Text>
      <Text>{token}</Text>
    </View>
  );
};

const ProfileRoute = () => <Text>Albums</Text>;

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    profile: ProfileRoute,
  });

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
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
