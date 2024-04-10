import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Avatar, Text } from "react-native-paper";

export default function CourseDesc({ course }) {
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

  return (
    <ScrollView>
      <Card
        mode="contained"
        style={[styles.card, { backgroundColor: theme.colors.background }]}
      >
        <Card.Title
          style={styles.header}
          title={course.name}
          titleStyle={[styles.ownerName, { color: theme.colors.secondary }]}
          left={OwnerAvatar}
          right={CourseName}
        />
      </Card>
      <View>
        <Text>Course Description:</Text>
        <Text>
          HTML, or Hypertext Markup Language, is the foundation of web
          development. In this course, students will gain a comprehensive
          understanding of HTML and its role in creating web pages. Through a
          combination of lectures, hands-on exercises, and projects, students
          will learn the fundamentals of HTML syntax, structure, and semantics.
        </Text>

        <Text>Course Objective:</Text>
        <Text>
          Understand the basic concepts and principles of HTML. Learn how to
          create well-structured HTML documents using tags and elements. Gain
          proficiency in formatting text, adding images, and creating
          hyperlinks. Explore advanced HTML features such as forms, tables, and
          multimedia elements. Understand the importance of accessibility and
          semantic markup in web development. Learn best practices for writing
          clean, maintainable HTML code. Gain practical experience through
          hands-on projects and assignments. Explore advanced HTML features such
          as forms, tables, and multimedia elements. Understand the importance
          of accessibility and semantic markup in web development. Learn best
          practices for writing clean, maintainable HTML code. Gain practical
          experience through hands-on projects and assignments.
        </Text>

        <Text>Course Topic:</Text>
        <Text>
          Introduction to HTML Basic HTML Document Structure Text Formatting and
          Styling Working with Links and Images Lists and Tables Forms and Input
          Elements Multimedia and Embedding Content Semantic HTML and
          Accessibility HTML5 Features and Modern Web Development Best Practices
          and Coding Standards
        </Text>
      </View>

      <View>
        <Text>Learning Materials</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingRight: 6,
  },
  header: {
    paddingEnd: 14,
  },
  ownerName: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
