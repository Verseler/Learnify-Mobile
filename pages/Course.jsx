import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppBar from "../components/AppBar";
import CourseDesc from "../components/Course/CourseDesc";
import LearningMaterials from "../components/Course/LearningMaterials";
import Activity from "../components/Course/Activity";
import Forum from "../components/Course/Forum";

export default function Course({ route }) {
  const Tab = createMaterialTopTabNavigator();
  console.log(route.params.course);
  return (
    <>
      <AppBar />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
            height: 3,
          },
        }}
        sceneContainerStyle={{ backgroundColor: theme.colors.background }}
      >
        <Tab.Screen
          name="Description"
          children={(props) => (
            <CourseDesc title="hello" course={route.params.course} {...props} />
          )}
        />
        <Tab.Screen name="Materials" children={LearningMaterials} />
        <Tab.Screen name="Activity" children={Activity} />
        <Tab.Screen name="Forum" children={Forum} />
      </Tab.Navigator>
    </>
  );
}
