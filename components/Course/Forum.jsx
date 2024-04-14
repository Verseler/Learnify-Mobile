import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import ForumComment from "./ForumComment";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function Forum() {
  return (
    <View style={styles.container}>
      <ForumComment />
      <ForumComment />
      <ForumComment role="user" />

      <KeyboardAvoidingView style={styles.bottomFields}>
        <TextInput mode="outlined" style={styles.commentField} />
        <Ionicons name="send" size={24} color={theme.colors.primary} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
  bottomFields: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    bottom: 0,
    right: 0,
    left: 0,
    height: 80,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  commentField: {
    flex: 1,
    borderRadius: 16,
  },
});
