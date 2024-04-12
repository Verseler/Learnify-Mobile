import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function LearningMaterialCard({ imgSrc, title }) {
  return (
    <Card
      onPress={() => console.log(2)}
      style={[styles.card, { backgroundColor: theme.colors.background }]}
    >
      <Card.Cover
        style={{ height: 100, borderRadius: 6 }}
        source={{
          uri: imgSrc,
        }}
      />
      <Card.Title title={title} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    padding: 10,
  },
});
