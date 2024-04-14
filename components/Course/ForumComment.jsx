import { StyleSheet, View, Text } from "react-native";

export default function ForumComment({ role }) {

  const UserComment = (
    <View style={[styles.container, styles.userComment]}>
      <View style={[styles.comment]}>
        <Text style={styles.commentator}>Verseler kerr Handuman</Text>
        <Text style={styles.content}>
          {" "}
          What role do HTML forms play in gathering user input on a website?
          Have you experimented with different form elements such as text
          fields, checkboxes, radio buttons, and dropdown menus?
        </Text>
      </View>

      <Text style={styles.timeStampt}>02:58 PM</Text>
    </View>
  );

  const OtherComment = (
    <View style={[styles.container, styles.otherComment]}>
      <View style={[styles.comment]}>
        <Text style={styles.commentator}>Verseler kerr Handuman</Text>
        <Text style={styles.content}>
          {" "}
          What role do HTML forms play in gathering user input on a website?
          Have you experimented with different form elements such as text
          fields, checkboxes, radio buttons, and dropdown menus?
        </Text>
      </View>
      <Text style={styles.timeStampt}>02:58 PM</Text>
    </View>
  );

  return <View>{role == "user" ? UserComment : OtherComment}</View>;
}

const styles = StyleSheet.create({
  container: {},
  userComment: {
    marginLeft: 40,
    alignSelf: "flex-end",
  },
  otherComment: {
    marginRight: 40,
    alignSelf: "flex-start",
  },
  comment: {
    backgroundColor: "lightgray",
    borderRadius: 16,
    padding: 16,
  },
  commentator: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
  },
  content: {
    lineHeight: 20,
  },
  timeStampt: {
    marginStart: 14,
    fontSize: 10,
  },
});
