import {Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { Avatar, ListItem } from "react-native-elements";
import React from "react";

import { MessagesBadge, SingleSmatchBadge } from "../components/Badges";
import {
  addMessage,
  deleteMatch,
  resetSmatchBadge,
  updateCurrentConversationId,
  updateGroups,
  updateMatches,
  updateProfiles,
} from '../redux/actions/actionCreators';
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";
import { unmatch } from "../api/SmatchServerAPI";
import { updateGroupsProfilesAndMatches } from "../api/SmatchServerAPI";

function MatchesScreen({
  loggedUserId,
  navigation,
  currentGroupId,
  matches,
  updateCurrentConversationId,
  resetSmatchBadge,
  deleteMatch,
  updateGroups,
  updateProfiles,
  updateMatches,
  addMessage
}) {
  const profiles = matches[currentGroupId];
  const matchesExist = profiles !== undefined && profiles.length !== 0 ? true : undefined;
  const [refreshing, setRefreshing] = React.useState(false);

  const unmatchButtons = (otherUserId) => [
    {
      text: "Unmatch",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.5)",
      onPress: () => {
        unmatch(currentGroupId, loggedUserId, otherUserId)
          .then(deleteMatch(otherUserId))
          .catch((err) => console.error(err));
        //TODO delete messages
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
      <SafeAreaView style={styles.container} >
        {matchesExist ? (
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {profiles.map((profile, i) => (
              <Swipeout right={unmatchButtons(profile.id)} autoClose={true} backgroundColor="transparent" key={i}>
                <ListItem
                  bottomDivider
                  onPress={() => {
                    updateCurrentConversationId(profile, currentGroupId);
                    resetSmatchBadge(profile.id);
                    navigation.navigate("ConversationScreen");
                  }}
                >
                  <Avatar
                    source={{ uri: profile.pictures[0] }}
                    size="large"
                    rounded
                    onPress={() => navigateToSmatchAccountScreen(navigation, profile)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{profile.name}</ListItem.Title>
                    <ListItem.Subtitle>{profile.lastSeen}</ListItem.Subtitle>
                  </ListItem.Content>
                  {profile.newMessages !== 0 ? <MessagesBadge newMessages={profile.newMessages} /> : null}
                  {profile.newSmatch ? <SingleSmatchBadge newMessages={profile.newMessages} /> : null}
                </ListItem>
              </Swipeout>
            ))}
          </ScrollView>) : (
              <ScrollView style={styles.errorContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <NoMatches />
              </ScrollView>
        )}
      </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  currentGroupId: state.mainReducer.currentGroupId,
  matches: state.mainReducer.matches,
  loggedUserId: state.authentication.id,
});

const mapDispatchToProps = { updateCurrentConversationId, resetSmatchBadge, updateGroups, updateProfiles, updateMatches, deleteMatch, addMessage };

export default connect(mapStateToProps, mapDispatchToProps)(MatchesScreen);

export function navigateToSmatchAccountScreen(navigation, profile) {
  navigation.navigate("SmatchAccountScreen", {
    image: profile.pictures[0],
    name: profile.name,
    id: profile.id,
    lastSeen: profile.lastSeen,
  });
}

function NoMatches() {
  return (
    <View>
      <Image style={styles.errorImage} source={require("../../assets/emptyMatches.jpeg")} />
      <Text style={styles.errorText}>Currently no matches to display</Text>
      <Text style={styles.errorText}>Pull to refresh or keep swiping right</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  errorImage: {
    marginTop: 70,
    marginLeft: 80,
    width: 250,
    height: 250,
  },
  errorText: {
    marginTop: 50,
    fontSize: 15,
    textAlign: "center",
  },

});
