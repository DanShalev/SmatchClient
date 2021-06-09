import React from "react";
import Swipeout from "react-native-swipeout";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import {
  registerForPushNotifications,
  removeFromGroup,
  updateGroupsProfilesAndMatches,
  unmatchAllGroupUsers,
  initMessages,
} from "../api/SmatchServerAPI";
import { Avatar, ListItem } from "react-native-elements";
import { SmatchesBadge, MessagesBadge } from "../components/Badges";
import { connect } from "react-redux";
import colors from "../config/colors";
import {
  updateCurrentGroupId,
  updateProfiles,
  updateMatches,
  updateGroups,
  deleteGroup,
  addMessage,
  deleteMatchesByGroupId,
} from "../redux/actions/actionCreators";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function GroupsScreen({
  navigation,
  loggedUserId,
  groups,
  updateCurrentGroupId,
  updateGroups,
  updateProfiles,
  updateMatches,
  deleteGroup,
  deleteMatchesByGroupId,
  addMessage,
}) {
  useEffect(() => {
    updateGroupsProfilesAndMatches(loggedUserId, updateGroups, updateProfiles, updateMatches, addMessage);
  }, []);

  useEffect(() => {
    registerForPushNotification();
    Notifications.addNotificationReceivedListener((notification) => {
      const loggedUserId = notification.request.content.data.userId;
      const otherUserId = notification.request.content.data.otherUserId;
      const groupId = notification.request.content.data.groupId;
      initMessages(loggedUserId, groupId, otherUserId, addMessage);
    });
  }, []);

  const registerForPushNotification = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      registerForPushNotifications(loggedUserId, token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };

  const areGroupsAvailable = Object.keys(groups).length > 0;

  const deleteButtons = (groupKey) => [
    {
      text: "Delete",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.5)",
      onPress: () => {
        deleteGroup(groupKey);
        deleteMatchesByGroupId(groupKey);
        updateCurrentGroupId(null);
        unmatchAllGroupUsers(groupKey, loggedUserId);
        removeFromGroup(groupKey, loggedUserId);
        //TODO add delete messagesByGroupId (BE)
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
            <Swipeout right={deleteButtons(groupKey)} autoClose={true} backgroundColor="transparent" key={i}>
              <ListItem
                bottomDivider
                onPress={() => {
                  updateCurrentGroupId(groupKey);
                  navigation.navigate("Home", { screen: "SwipeScreen", params: { screen: "Swipe" } });
                }}
              >
                <Avatar source={{ uri: group.avatar }} size="large" rounded />
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
  groups: state.mainReducer.groups,
});
const mapDispatchToProps = {
  deleteMatchesByGroupId,
  deleteGroup,
  updateGroups,
  updateProfiles,
  updateMatches,
  updateCurrentGroupId,
  addMessage,
};
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
