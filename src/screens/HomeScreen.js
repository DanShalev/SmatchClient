import React from "react";
import { Alert, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem, Avatar } from "react-native-elements";

import HomeScreenMocks from "../../mocks/HomeScreenMocks.js";
import colors from "../config/colors.js";
import { CreateGroupScreen } from "./CreateGroup";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Groups") {
            iconName = "ios-people";
          } else if (route.name === "Browse") {
            iconName = "ios-search";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.secondary,
        inactiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen name="Groups" component={GroupsTab} />
      <Tab.Screen name="Browse" component={BrowseTab} />
    </Tab.Navigator>
  );
}

export function GroupsTab() {
  return (
    <ScrollView>
      {HomeScreenMocks.map((l, i) => (
        <ListItem
          key={i}
          bottomDivider
          onPress={() =>
            Alert.alert(`Group "${l.name}"`, "", [{ text: "OK" }], {
              cancelable: false,
            })
          }
        >
          <Avatar
            title={l.avatar_title}
            overlayContainerStyle={{ backgroundColor: colors.primary }}
            rounded
          />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}

export function BrowseTab() {
  return <CreateGroupScreen />;
}
