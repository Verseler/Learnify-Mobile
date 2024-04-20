import { FlatList, View, Text } from "react-native";
import { StyleSheet } from "react-native";

import ActivityCard from "./ActivityCard";

export default function Activity({ activities }) {
  //temporary data, delete it later
  const tempActivities = [{ id: 1 }];

  const activityCards = !tempActivities ? (
    <Text style={{ color: theme.colors.secondary }}>No Activity</Text>
  ) : (
    tempActivities.map((activity) => (
      <>
        <ActivityCard />
        <View style={{ height: 14 }} />
      </>
    ))
  );

  return (
    <View style={styles.container}>
      {activityCards}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  body: {
    flex: 1,
  },
});
