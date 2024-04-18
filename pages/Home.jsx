import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Searchbar, Snackbar } from "react-native-paper";

import CourseCard from "../components/CourseCard";
import AppBar from "../components/AppBar";
import socketAddress from "../utils/socketAddress";
import { getSecureStore } from "../utils/SecureStore";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userToken = getSecureStore("userToken");
  const [serverError, setServerError] = useState("");
  const [originalCourseData, setOriginalCourseData] = useState([]);
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
      const url = `${socketAddress}/api/dashboard`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const res = await fetch(url, requestOptions);
      const convertedData = await res.json();

      setOriginalCourseData(convertedData.data);
      setCourses(convertedData.data);
    } catch (error) {
      setServerError(error);
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
        data={courses}
        onRefresh={getCourses}
        refreshing={refreshing}
        renderItem={({ item }) => <CourseCard key={item.id} course={item} />}
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
