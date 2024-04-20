import { StyleSheet, ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";

import LearningMaterialCard from "./LearningMaterialCard";

export default function LearningMaterials({ materials }) {
  //temporary materials, delete this later
  const VideoMaterials = [ {
    id: 1,
    title: "HTML",
    image_path:
      "https://pixelmechanics.com.sg/wp-content/uploads/2019/06/html5-logo-for-web-development.png",
  }
];

const TextMaterials = [ {
  id: 1,
  title: "HTML",
  image_path:
  "https://play-lh.googleusercontent.com/al0dTxQRaJDfSdu0efvZBx4KeATQ7u_pff4e7eJimo4LW6Bkgic-H9CNjdO0QFcMSts",
}
];

  const VideoLearningMaterials = VideoMaterials.map((item) => {
    return (
      <LearningMaterialCard
        key={item.id}
        imgSrc={item.image_path}
        title={item.title}
      />
    );
  });

  const TextLearningMaterials = TextMaterials.map((item) => {
    return (
      <LearningMaterialCard
        key={item.id}
        imgSrc={item.image_path}
        title={item.title}
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
