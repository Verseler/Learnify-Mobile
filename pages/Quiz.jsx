import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";

import QuestionCard from "../components/Quiz/QuestionCard";

export default function Quiz() {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.cover, { backgroundColor: theme.colors.primary }]}>
        <Text
          variant="titleMedium"
          style={[styles.title, { color: theme.colors.onPrimary }]}
        >
          QUIZ 1: TEST YOUR MARKUP KNOWLEDGE{" "}
        </Text>
        <Text
          variant="titleLarge"
          style={[styles.score, { color: theme.colors.onPrimary }]}
        >
          2/3
        </Text>
      </View>

      <View style={styles.content}>
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />

        <Button
          style={styles.submitButton}
          onPress={() => console.log("submit quiz")}
          mode="contained"
        >
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  cover: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
  },
  score: {
    fontWeight: "bold",
  },
  content: {
    rowGap: 20,
    padding: 14,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    padding: 2,
  },
});
