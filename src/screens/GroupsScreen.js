import React from "react";
import Swipeout from "react-native-swipeout";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { getGroups, registerForPushNotifications } from "../api/SmatchServerAPI";
import { Avatar, ListItem } from "react-native-elements";
import { SmatchesBadge, MessagesBadge } from "../components/Badges";
import { connect } from "react-redux";
import colors from "../config/colors";
import { addGroup, updateCurrentGroupId } from "../redux/actions/actionCreators";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function GroupsScreen({ navigation, loggedUserId, addGroup, groups, updateCurrentGroupId }) {
  useEffect(() => {
    getGroups(loggedUserId, addGroup);
  }, []);

  useEffect(() => {
    registerForPushNotification();
  }, []);

  const registerForPushNotification = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      registerForPushNotifications(1, token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };

  const areGroupsAvailable = Object.keys(groups).length > 0;

  let deleteButtons = [
    {
      text: "Delete",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.5)",
      onPress: () => {
        alert("Group deleted");
      },
    },
  ];

  return (
    <ScrollView>
      {!areGroupsAvailable ? (
        <ServerOfflineErrorMessage />
      ) : (
        Object.keys(groups).map((groupKey, i) => {
          let group = groups[groupKey];
          return (
            <Swipeout right={deleteButtons} autoClose={true} backgroundColor="transparent" key={i}>
              <ListItem
                bottomDivider
                onPress={() => {
                  updateCurrentGroupId(groupKey);
                  navigation.navigate("Home", { screen: "SwipeScreen", params: { screen: "Swipe" } });
                }}
              >
                <Avatar source={{ uri: group.avatarUrl }} size="large" rounded />
                <ListItem.Content>
                  <ListItem.Title>{group.name}</ListItem.Title>
                  <ListItem.Subtitle>{group.numberOfMembers}</ListItem.Subtitle>
                </ListItem.Content>
                {group.newSmatches !== 0 ? <SmatchesBadge newMessages={group.newMessages} newSmatches={group.newSmatches} /> : null}
                {group.newMessages !== 0 ? <MessagesBadge newMessages={group.newMessages} /> : null}
              </ListItem>
            </Swipeout>
          );
        })
      )}
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  loggedUserId: state.authentication.id,
  groups: state.groups.groups,
});
const mapDispatchToProps = { addGroup, updateCurrentGroupId };
export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);

function ServerOfflineErrorMessage() {
  return (
    <>
      <Text style={styles.errTextStyle}>Please load java server & ngrok to see results!</Text>
      <Text style={styles.errTextStyle}>Groups mocks are deprecated</Text>
    </>
  );
}

const styles = StyleSheet.create({
  errTextStyle: {
    fontSize: 50,
    textAlign: "center",
    backgroundColor: colors.secondary,
  },
});
