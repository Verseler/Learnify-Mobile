import { StyleSheet, ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";

import LearningMaterialCard from "./LearningMaterialCard";

export default function LearningMaterials({ course }) {
  const Materials = [ {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Hazel Mondejar",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdx6kwUFu3LgLTVh0t2t38H4-RjFPOQdPr0JunoiQRQ&s",
    progress: 0,
    courseName: "HTML",
    imgSrc:
      "https://pixelmechanics.com.sg/wp-content/uploads/2019/06/html5-logo-for-web-development.png",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Belle Pimentel",
    avatarSrc:
      "https://static.vecteezy.com/system/resources/previews/004/773/704/non_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
    progress: 0.2,
    courseName: "CSS",
    imgSrc:
      "https://pixelmechanics.com.sg/wp-content/uploads/2019/04/css.jpg",
  },
];

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
        imgSrc="https://play-lh.googleusercontent.com/al0dTxQRaJDfSdu0efvZBx4KeATQ7u_pff4e7eJimo4LW6Bkgic-H9CNjdO0QFcMSts"
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
