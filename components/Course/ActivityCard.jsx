import { Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ActivityCard() {
  const navigation = useNavigation();

  return (
    <Card
      onPress={() => navigation.navigate("Quiz")}
      style={{ backgroundColor: theme.colors.background }}
    >
      <View style={styles.contentWrapper}>
        <Card.Cover
          style={styles.image}
          source={require("../../assets/Icons/pdfCover.png")}
        />
        <Card.Title
          style={styles.title}
          title="Quiz 1: Test your markup knowledge"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    height: 70,
    width: 60,
  },
  title: {
    flex: 1,
  },
});
