import { Text, Card, Button, Avatar, ProgressBar } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CourseCard({ course }) {
  const navigation = useNavigation();

  const OwnerAvatar = (props) => (
    <Avatar.Image {...props} source={{ uri: course.avatarSrc }} />
  );

  const CourseName = () => (
    <Text
      variant="titleMedium"
      style={{ fontWeight: "bold", textTransform: "uppercase" }}
    >
      {course.courseName}
    </Text>
  );

  const Progress = () => {
    const progressInPercentage = course.progress * 100;

    return (
      <View style={{ gap: 4 }}>
        <ProgressBar progress={course.progress} />
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
        title={course.name}
        titleStyle={[styles.ownerName, { color: theme.colors.secondary }]}
        left={OwnerAvatar}
        right={CourseName}
      />
      <View style={styles.body}>
        <View style={styles.leftBody}>
          <Image style={styles.courseImage} source={{ uri: course.imgSrc }} />
          <View style={styles.courseVideoCount}>
            <Text style={styles.courseVideoCountLabel}>10 videos</Text>
          </View>
        </View>

        <View style={styles.rightBody}>
          <Card.Content>
            <Progress />
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.push("Course", { course: course })}
            >
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
    fontSize: 15,
  },
  completeLabel: {
    fontSize: 12,
    textAlign: "right",
  },
  courseImage: {
    width: 170,
    height: 120,
    marginStart: 15,
    borderRadius: 6,
  },
  courseVideoCount: {
    position: "absolute",
    left: 18,
    top: 3,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: "rgba(0, 0, 0, 0.49)",
  },
  courseVideoCountLabel: {
    fontSize: 6,
    color: "white",
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
