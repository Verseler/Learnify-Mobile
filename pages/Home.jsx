import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Searchbar } from "react-native-paper";

import CourseCard from "../components/CourseCard";
import AppBar from "../components/AppBar";
import socketAddress from "../utils/socketAddress";
import { getSecureStore } from "../utils/SecureStore";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = getSecureStore("userToken");
  const originCourseData = [];
  const [courses, setCourses] = useState(originCourseData);

  useEffect(() => {
    const filteredCourses = originCourseData.filter((course) =>
      course.title.includes(searchQuery.toLowerCase())
    );
    setCourses(filteredCourses);
  }, [searchQuery]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const url = `${socketAddress}/api/dashboard`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data);
      // setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const TopContent = (
    <>
      <Text style={styles.heading} variant="labelMedium">
        Take IT education experience to the next level.
      </Text>
      <Searchbar
        placeholder="Search Courses"
        onChangeText={setSearchQuery}
        value={searchQuery}
        inputStyle={{
          minHeight: 0,
        }}
        style={[styles.searchBar, { backgroundColor: theme.colors.background }]}
      />

      <Text variant="titleMedium" style={styles.courseListLabel}>
        Courses
      </Text>
    </>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar hasProfileAvatar={true} title="Learnify" />

      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCard course={item} />}
        ListEmptyComponent={
          <Text
            style={{
              color: theme.colors.secondary,
            }}
          >
            Not enrolled to a course
          </Text>
        }
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
        style={styles.body}
        ListHeaderComponent={TopContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 14,
  },
  heading: {
    alignSelf: "center",
    textAlign: "center",
    paddingVertical: 16,
  },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
  },
  courseListLabel: {
    marginTop: 24,
    marginBottom: 8,
  },
});
