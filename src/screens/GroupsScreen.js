import React, {useState} from "react";
import Swipeout from "react-native-swipeout";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import {Image, RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import { useEffect } from "react";
import {
  registerForPushNotifications,
  removeUserFromGroup,
  updateGroupsProfilesAndMatches,
  unmatchAllGroupUsers,
  initMessages, getAndUpdateBrowseGroups, getAndUpdateCategories,
} from '../api/SmatchServerAPI';
import { Avatar, ListItem } from "react-native-elements";
import { SmatchesBadge, MessagesBadge } from "../components/Badges";
import { connect } from "react-redux";
import {
  updateCurrentGroupId,
  updateProfiles,
  updateMatches,
  updateGroups,
  deleteGroup,
  addMessage,
  deleteMatchesByGroupId,
  setLoggedOutCredentials, updateBrowseGroups, updateCategories,
} from '../redux/actions/actionCreators';
import { validateFacebookAuthentication } from "../api/facebook-login/facebookLoginUtils";
import * as FileSystem from "expo-file-system";

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
                        setLoggedOutCredentials,
                        updateBrowseGroups,
                        updateCategories
                      })
{
  const [refreshing, setRefreshing] = React.useState(false);
  const [convertedAvatars, setConvertedAvatar] = useState({});

  useEffect(() => {
    updateGroupsProfilesAndMatches(loggedUserId, updateGroups, updateProfiles, updateMatches, addMessage);
    registerForPushNotification();
    validateFacebookAuthentication(setLoggedOutCredentials);
    getAndUpdateBrowseGroups(updateBrowseGroups);
    getAndUpdateCategories(updateCategories);
    Notifications.addNotificationReceivedListener((notification) => {
      const loggedUserId = notification.request.content.data.userId;
      const otherUserId = notification.request.content.data.otherUserId;
      const groupId = notification.request.content.data.groupId;
      initMessages(loggedUserId, groupId, otherUserId, addMessage);
    });
  }, []);

  useEffect(() => {
    convertAvatars(groups).then((res) => setConvertedAvatar(res))
  }, [groups])

  async function convertAvatars(groups) {
    let updatedAvatars = {}
    for (const [i, group] of Object.entries(groups)) {
      if (group.avatar.startsWith("file")) {
        updatedAvatars[i] = await FileSystem.readAsStringAsync(group.avatar);
      } else {
        updatedAvatars[i] = group.avatar
      }
    }
    return updatedAvatars
  }

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
        removeUserFromGroup(groupKey, loggedUserId);
        //TODO add delete messagesByGroupId (BE)
      },
    },
  ];

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateGroupsProfilesAndMatches(loggedUserId, updateGroups, updateProfiles, updateMatches, addMessage);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
                  navigation.navigate("Home", {screen: "SwipeScreen", params: {screen: "Swipe"}});
                }}
              >
                <Avatar source={{uri: convertedAvatars[groupKey]}} size="large" rounded onPress={() => {
                  navigation.navigate("GroupDetails", {groupId: groupKey})
                }}/>
                <ListItem.Content>
                  <ListItem.Title>{group.name}</ListItem.Title>
                  <ListItem.Subtitle>{group.numberOfMembers}</ListItem.Subtitle>
                </ListItem.Content>
                {group.newSmatches !== 0 ?
                  <SmatchesBadge newMessages={group.newMessages} newSmatches={group.newSmatches}/> : null}
                {group.newMessages !== 0 ? <MessagesBadge newMessages={group.newMessages}/> : null}
              </ListItem>
            </Swipeout>
          );
        })
      )}
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  loggedUserId: state.authentication.authCredentials.facebook_id,
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
  setLoggedOutCredentials,
  updateBrowseGroups,
  updateCategories
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);

function ServerOfflineErrorMessage() {
  return (
    <>
      <Image style={styles.errorImage} source={require("../../assets/emptyGroups.png")} />
      <Text style={styles.errorText}>Currently no groups to display</Text>
      <Text style={styles.errorText}>Pull to refresh or create group</Text>
    </>
  );
}

const styles = StyleSheet.create({
  errorImage: {
    marginTop: 40,
    marginLeft: 80,
    width: 250,
    height: 220,
  },
  errorText: {
    marginTop: 50,
    fontSize: 15,
    textAlign: "center",
  },
});
