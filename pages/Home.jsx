import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Searchbar, Snackbar } from "react-native-paper";

import CourseCard from "../components/CourseCard";
import AppBar from "../components/AppBar";
import baseURL from "../utils/baseURL";
import { getSecureStore } from "../utils/SecureStore";

export default function Home() {
  const userToken = getSecureStore("userToken");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [serverError, setServerError] = useState("");
  //temp data, delete the value of this state later
  const [originalCourseData, setOriginalCourseData] = useState([
    {
      instructor_name: "kero",
      progress: 0.8,
      title: "Intro to Javascript",
      image_path:
        "https://miro.medium.com/v2/resize:fit:785/1*H-25KB7EbSHjv70HXrdl6w.png",
      course_id: 1,
      objectives: ["1. osas", "2. dream"],
      topics: ["1. dom", "2. virtual dom"],
    },
  ]);
  const [courses, setCourses] = useState(originalCourseData);

  useEffect(() => {
    const filteredCourses = originalCourseData.filter((course) =>
      course.title.includes(searchQuery.toLowerCase())
    );
    setCourses(filteredCourses);
  }, [searchQuery]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    setRefreshing(true);
    try {
      const url = `${baseURL}/api/dashboard`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const res = await fetch(url, requestOptions);
      const { data } = await res.json();

      //if get request error then display the error
      if (!data["success"]) {
        setServerError(data.message);
      }
      //else store the data
      else {
        setOriginalCourseData(data);
        setCourses(data);
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const onDismissSnackBarHandler = () => setServerError("");

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
        style={styles.body}
        data={courses}
        onRefresh={getCourses}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <CourseCard key={item.course_id} course={item} />
        )}
        keyExtractor={(item) => item.course_id}
        ListHeaderComponent={TopContent}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.secondary }}>
            Not enrolled to a course
          </Text>
        }
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
      />

      {/* Display server error response */}
      <Snackbar
        style={styles.snackBar}
        visible={serverError}
        onDismiss={onDismissSnackBarHandler}
      >
        {serverError}
      </Snackbar>
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
  snackBar: {
    width: "100%",
    marginHorizontal: 14,
    backgroundColor: "red",
  },
});
