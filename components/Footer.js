import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import iconsName from "../utils/icons";
import Explore from "../screens/Explore";
import AddProduct from "../screens/AddProduct";
import Bookmarks from "../screens/Bookmarks";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const Footer = () => {
  // const tabOffSetValue = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerStyle: {
            height: 80,
          },
          tabBarStyle: {
            height: 80,
          },

          tabBarIcon: ({ focused, color, size }) => {
            const iconName = iconsName(route.name);

            return (
              <MaterialIcons
                name={iconName}
                size={size}
                color={focused ? "#2a7abf" : "gray"}
              />
            );
          },
        })}
      >
        <Tab.Screen name={"Explore"} component={Explore} />
        <Tab.Screen name={"Add"} component={AddProduct} />
        <Tab.Screen name={"Bookmarks"} component={Bookmarks} />
        <Tab.Screen name={"Settings"} component={Settings} />
      </Tab.Navigator>
      <View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: "#2a7abf",
          position: "absolute",
          bottom: 80,
          left: 10,
          borderRadius: 50,
        }}
      />
    </>
  );
};

export default Footer;

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 40;
  return width / 4;
}
