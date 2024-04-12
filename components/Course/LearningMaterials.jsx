import { StyleSheet, ScrollView, View, Image } from "react-native";
import { Text, Card } from "react-native-paper";

import LearningMaterialCard from "./LearningMaterialCard";

export default function LearningMaterials({course}) {
  const Materials = [];

  return (
    <ScrollView style={styles.container}>
      {/* Video Learning Materials */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.title}>
          Video Learning Materials
        </Text>
        <View style={styles.cards}>
          {Materials.map((item) => {
            return (
              <LearningMaterialCard
                key={item.id}
                imgSrc={item.imgSrc}
                title={item.courseName}
              />
            );
          })}
        </View>
      </View>

      {/*Text Learning Materials */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.title}>
          Document Learning Materials
        </Text>
        <View style={styles.cards}>
          {Materials.map((item) => {
            return (
              <LearningMaterialCard
                key={item.id}
                imgSrc={item.imgSrc}
                title={item.courseName}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  section: {
    marginBottom: 40,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
});
