import { View } from "react-native";
import { StyleSheet } from "react-native";

import ActivityCard from "./ActivityCard";

export default function Activity() {
  return <View style={styles.container}>
    {/* !!! Use flatlist */}
    <ActivityCard />
    <View style={{height: 14}} />
    <ActivityCard />
    <View style={{height: 14}} />
    <ActivityCard />
    <View style={{height: 14}} />
    <ActivityCard />
    <View style={{height: 14}} />
    <ActivityCard />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 14
  },
});
