import React from "react";
import { Text, View, Alert, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListItem, Avatar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreenMocks from "../../mocks/HomeScreenMocks.js";
import colors from "../config/colors.js";
import SmatchLogoHeader from "../screenUtils/Headers/SmatchLogoHeader";
import SideMenuHeader from "../screenUtils/Headers/SideMenuHeader";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  setNavBarHeaders(navigation);
  return (
      <Tab.Navigator
          screenOptions={tabNavigationOptions()}
          tabBarOptions={tabNavigationColors()}
      >
        <Tab.Screen name="Groups" component={GroupsTab} />
        <Tab.Screen name="Browse" component={BrowseTab} />
      </Tab.Navigator>
  );
}

function setNavBarHeaders(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <SideMenuHeader navigation={navigation} />,
    });
  }, [navigation]);
}

function tabNavigationColors() {
  return {
    activeTintColor: colors.secondary,
    inactiveTintColor: colors.primary,
  };
}

function tabNavigationOptions() {
  return ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === "Groups") {
        iconName = "ios-people";
      } else if (route.name === "Browse") {
        iconName = "ios-search";
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });
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
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Browse!</Text>
      </View>
  );
}
