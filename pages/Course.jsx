import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";

import AppBar from "../components/AppBar";
import Description from "../components/Course/Description";
import LearningMaterials from "../components/Course/LearningMaterials";
import Activity from "../components/Course/Activity";
import Forum from "../components/Course/Forum";
import socketAddress from "../utils/socketAddress";
import { getSecureStore } from "../utils/SecureStore";

export default function Course({ route }) {
  const userToken = getSecureStore("userToken");
  const Tab = createMaterialTopTabNavigator();
  const id = route.params.id;
  const imgPath = route.params.imgPath;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const url = `${socketAddress}/api/course/${id}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const res = await fetch(url, requestOptions);
      const convertedData = await res.json();

      setCourse(convertedData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar hasBackAction={true} hasLogo={false} title={course?.title} />
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
            <Description
              title={course?.title}
              instructor={course?.instructor_name}
              image={imgPath}
              desc={course?.description}
              objectives={course?.objectives}
              topics={course?.topics}
              {...props}
            />
          )}
        />
        <Tab.Screen
          name="Materials"
          children={(props) => (
            <LearningMaterials materials={course?.materials} {...props} />
          )}
        />
        <Tab.Screen name="Activity" children={Activity} />
        <Tab.Screen name="Forum" children={Forum} />
      </Tab.Navigator>
    </>
  );
}
