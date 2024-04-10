import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useTheme, Text, Searchbar } from "react-native-paper";

import CourseCard from "../components/CourseCard";
import AppBar from "../components/AppBar";

export default function Home() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Hazel Mondejar",
      avatarSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdx6kwUFu3LgLTVh0t2t38H4-RjFPOQdPr0JunoiQRQ&s",
      progress: 0,
      courseName: "HTML",
      imgSrc:
        "https://pixelmechanics.com.sg/wp-content/uploads/2019/06/html5-logo-for-web-development.png",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Belle Pimentel",
      avatarSrc:
        "https://static.vecteezy.com/system/resources/previews/004/773/704/non_2x/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
      progress: 0.2,
      courseName: "CSS",
      imgSrc:
        "https://pixelmechanics.com.sg/wp-content/uploads/2019/04/css.jpg",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "James Nangcas",
      avatarSrc:
        "https://img.freepik.com/premium-vector/male-avatar-flat-icon-design-vector-illustration_549488-103.jpg",
      progress: 0.5,
      courseName: "Javascript",
      imgSrc:
        "https://miro.medium.com/v2/resize:fit:785/1*H-25KB7EbSHjv70HXrdl6w.png",
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
      <AppBar />

      <FlatList
        data={DATA}
        renderItem={({ item }) => <CourseCard course={item} />}
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
