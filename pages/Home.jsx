import { useState } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { Appbar, useTheme, Text, Searchbar } from "react-native-paper";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Hazel Mondejar",
      progress: 0,
      courseName: "HTML",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Belle Pimentel",
      progress: 0.2,
      courseName: "HTML",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "James Nangcas",
      progress: 0.5,
      courseName: "Javascript",
    },
  ];

  const TopContent = () => (
    <>
      <Text style={styles.heading} variant="titleSmall">
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
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Image
          style={styles.logo}
          source={require("../assets/Icons/Logo.png")}
        />
        <Appbar.Content title="Learnify" titleStyle={{ fontWeight: "bold" }} />
        <Appbar.Action
          size={40}
          color={theme.colors.primary}
          icon="account-circle"
          onPress={() => {}}
        />
      </Appbar.Header>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <CourseCard
            name={item.name}
            courseName={item.courseName}
            progress={item.progress}
          />
        )}
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
  logo: {
    height: 50,
    width: 50,
    marginStart: 6,
    marginEnd: 10,
    objectFit: "contain",
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
