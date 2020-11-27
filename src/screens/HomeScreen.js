import * as React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem, Avatar } from 'react-native-elements'
import HomeScreenMocks from "../../mocks/HomeScreenMocks.js";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-people';
          } else if (route.name === 'Browse') {
            iconName = 'ios-search';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={GroupsTab} />
      <Tab.Screen name="Browse" component={BrowseTab} />
    </Tab.Navigator>
  );
}

export function GroupsTab() {
  return (
      <ScrollView>
          {
              HomeScreenMocks.map((l, i) => (
                  <ListItem
                      key={i}
                      bottomDivider
                      onPress={() => Alert.alert(`Group "${l.name}"`,'',[{text: 'OK'}],{cancelable: false})}
                  >
                      <Avatar
                          title={l.avatar_title}
                          overlayContainerStyle={{backgroundColor: 'gray'}}
                          rounded
                      />
                      <ListItem.Content>
                          <ListItem.Title>{l.name}</ListItem.Title>
                          <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                      </ListItem.Content>
                  </ListItem>
              ))
          }
      </ScrollView>
  );
}

export function BrowseTab() {
  return (
    <View style={styles.browseTabViewStyle}>
      <Text>Browse!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  browseTabViewStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' },
});