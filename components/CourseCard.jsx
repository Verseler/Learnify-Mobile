import { Text, Card, Button, Avatar, ProgressBar } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function CourseCard({ name, progress, courseName }) {
  const OwnerAvatar = (props) => (
    <Avatar.Image {...props} source={{ uri: "https://picsum.photos/700" }} />
  );
  const CourseName = () => (
    <Text
      variant="titleMedium"
      style={{ fontWeight: "bold", textTransform: "uppercase" }}
    >
      {courseName}
    </Text>
  );
  const Progress = () => {
    const progressInPercentage = progress * 100;

    return (
      <View style={{ gap: 4 }}>
        <ProgressBar progress={progress} />
        <Text style={styles.completeLabel}>
          {progressInPercentage}% Complete
        </Text>
      </View>
    );
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.background }]}>
      <Card.Title
        style={styles.header}
        title={name}
        titleStyle={[styles.ownerName, { color: theme.colors.secondary }]}
        left={OwnerAvatar}
        right={CourseName}
      />
      <View style={styles.body}>
        <Image
          style={styles.courseImage}
          source={{ uri: "https://picsum.photos/700" }}
        />
        <View style={styles.rightBody}>
          <Card.Content>
            <Progress />
          </Card.Content>
          <Card.Actions>
            <Button style={styles.button} onPress={() => {}} mode="contained">
              View Course
            </Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "gainsboro",
    paddingRight: 6,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  header: {
    paddingEnd: 14,
  },
  ownerName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  completeLabel: {
    fontSize: 12,
    textAlign: "right",
  },
  courseImage: {
    width: 170,
    height: 120,
    marginStart: 15,
    borderRadius: 8,
  },
  rightBody: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
  },
  button: {
    flex: 1,
  },
});
