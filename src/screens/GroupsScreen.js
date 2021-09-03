import React, { useState } from "react";
import Swipeout from "react-native-swipeout";

import { Image, RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import {
  removeUserFromGroup,
  updateGroupsProfilesAndMatches,
  unmatchAllGroupUsers,
  getAndUpdateBrowseGroups, getAndUpdateCategories
} from "../api/SmatchServerAPI";
import { Avatar, ListItem } from "react-native-elements";
import { SmatchesBadge, MessagesBadge } from "../components/Badges";
import { useDispatch, useSelector } from "react-redux";
import { validateFacebookAuthentication } from "../api/facebook-login/facebookLoginUtils";
import * as FileSystem from "expo-file-system";
import { selectUserFacebookId } from "../redux/slices/authSlice";
import { deleteGroup, selectCurrentGroupId, selectGroups, updateCurrentGroupId } from "../redux/slices/groupsSlice";
import { deleteMatchesByGroupId, selectMatches } from "../redux/slices/matchesSlice";


export default function GroupsScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [convertedAvatars, setConvertedAvatar] = useState({});

  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const loggedUserId = useSelector(selectUserFacebookId);
  const currentGroupId = useSelector(selectCurrentGroupId);
  const matches = useSelector(selectMatches);

  useEffect(() => {
    updateGroupsProfilesAndMatches(loggedUserId, dispatch, currentGroupId, matches);
    validateFacebookAuthentication(dispatch);
    getAndUpdateBrowseGroups(dispatch);
    getAndUpdateCategories(dispatch);
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

  const areGroupsAvailable = Object.keys(groups).length > 0;

  const deleteButtons = (groupKey) => [
    {
      text: "Delete",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.5)",
      onPress: () => {
        dispatch(deleteGroup({groupId: groupKey}));
        dispatch(deleteMatchesByGroupId({groupId: groupKey}));
        dispatch(updateCurrentGroupId(null));
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
    updateGroupsProfilesAndMatches(loggedUserId, dispatch, currentGroupId, matches);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [matches]);

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
                  dispatch(updateCurrentGroupId(groupKey));
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
