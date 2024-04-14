import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function Description({ course }) {
  return (
    <ScrollView>
      <View style={styles.coverContainer}>
        <Image style={{ height: "100%" }} source={{ uri: course.imgSrc }} />
        <Avatar.Image
          size={45}
          style={styles.avatar}
          source={{ uri: course.avatarSrc }}
        />
        <Text variant="labelSmall" style={styles.ownersName}>
          {course.name}
        </Text>
      </View>

      <View style={styles.descContainer}>
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.title}>
            Course Description:
          </Text>
          <Text style={styles.paragraph}>
            HTML, or Hypertext Markup Language, is the foundation of web
            development. In this course, students will gain a comprehensive
            understanding of HTML and its role in creating web pages. Through a
            combination of lectures, hands-on exercises, and projects, students
            will learn the fundamentals of HTML syntax, structure, and
            semantics.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.title}>
            Course Objective:
          </Text>
          <Text style={styles.paragraph}>
            Understand the basic concepts and principles of HTML. Learn how to
            create well-structured HTML documents using tags and elements. Gain
            proficiency in formatting text, adding images, and creating
            hyperlinks. Explore advanced HTML features such as forms, tables,
            and multimedia elements. Understand the importance of accessibility
            and semantic markup in web development. Learn best practices for
            writing clean, maintainable HTML code. Gain practical experience
            through hands-on projects and assignments. Explore advanced HTML
            features such as forms, tables, and multimedia elements. Understand
            the importance of accessibility and semantic markup in web
            development. Learn best practices for writing clean, maintainable
            HTML code. Gain practical experience through hands-on projects and
            assignments.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.title}>
            Course Topic:
          </Text>
          <Text style={styles.paragraph}>
            Introduction to HTML Basic HTML Document Structure Text Formatting
            and Styling Working with Links and Images Lists and Tables Forms and
            Input Elements Multimedia and Embedding Content Semantic HTML and
            Accessibility HTML5 Features and Modern Web Development Best
            Practices and Coding Standards
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    height: 300,
  },
  avatar: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  ownersName: {
    position: "absolute",
    bottom: 4,
    right: 10,
    textTransform: "uppercase",
  },
  descContainer: {
    padding: 14,
  },
  section: {
    marginBottom: 44
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 15,
    color: "dimgrey",
    fontWeight: "normal",
    textAlign: "justify",
  },
});
