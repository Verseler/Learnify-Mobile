import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

export default function QuestionCard() {
  const [answer, setAnswer] = useState("first");

  return (
    <View style={styles.container}>
      <View style={styles.questionWrapper}>
        <Text style={[styles.questionCount, { color: theme.colors.primary }]}>
          Question 1
        </Text>
        <Text variant="titleMedium" style={styles.questionDesc}>
          Which element defines the document's root in HTML?
        </Text>
      </View>

      <RadioButton.Group
        onValueChange={(newAnswer) => setAnswer(newAnswer)}
        value={answer}
      >
        <RadioButton.Item
          style={styles.answerOption}
          label="<body>"
          value="<body>"
        />
         <View style={{height: 10}} />
        <RadioButton.Item
          style={styles.answerOption}
          label="<head>"
          value="<head>"
        />
         <View style={{height: 10}} />
        <RadioButton.Item
          style={styles.answerOption}
          label="<html>"
          value="<html>"
        />
         <View style={{height: 10}} />
        <RadioButton.Item
          style={styles.answerOption}
          label="<title>"
          value="<title>"
        />
      </RadioButton.Group>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  questionWrapper: {
    marginBottom: 16,
    rowGap: 8,
  },
  questionDesc: {
    fontWeight: "bold",
  },
  answerOption: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "darkgray",
  },
});
