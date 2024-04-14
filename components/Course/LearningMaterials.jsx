import { StyleSheet, ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";

import LearningMaterialCard from "./LearningMaterialCard";

export default function LearningMaterials({ course }) {
  const Materials = [];

  const VideoLearningMaterials = Materials.map((item) => {
    return (
      <LearningMaterialCard
        key={item.id}
        imgSrc={item.imgSrc}
        title={item.courseName}
      />
    );
  });

  const TextLearningMaterials = Materials.map((item) => {
    return (
      <LearningMaterialCard
        key={item.id}
        imgSrc={item.imgSrc}
        title={item.courseName}
      />
    );
  });

  return (
    <ScrollView style={styles.container}>
      {/* Video Learning Materials */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.title}>
          Video Learning Materials
        </Text>
        <View style={styles.cards}>
          {VideoLearningMaterials}
        </View>
      </View>

      {/*Text Learning Materials */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.title}>
          Text Learning Materials
        </Text>
        <View style={styles.cards}>{TextLearningMaterials}</View>
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
