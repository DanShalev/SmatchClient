import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Avatar, ListItem} from "react-native-elements";
import React from "react";

import {MessagesBadge, SingleSmatchBadge} from "../components/Badges";
import {deleteMatch} from "../redux/actions/actionCreators";
import {connect} from "react-redux";

function MatchesScreen({navigation, route, currentGroupId, matches}) {
  const profiles = matches.matches[currentGroupId];
  const matchesExist = profiles !== undefined && profiles.length !== 0 ? true : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {matchesExist ? (
          <>
            {profiles.map((profile, i) => (
              <ListItem key={i} bottomDivider onPress={() => navigation.navigate("ConversationScreen")}>
                <Avatar
                  source={{uri: profile.pictures[0]}}
                  size="large"
                  rounded
                  onPress={() => navigateToSmatchAccountScreen(navigation, profile)}
                />
                <ListItem.Content>
                  <ListItem.Title>{profile.name}</ListItem.Title>
                  <ListItem.Subtitle>{profile.lastSeen}</ListItem.Subtitle>
                </ListItem.Content>
                {profile.newMessages !== 0 ? <MessagesBadge newMessages={profile.newMessages}/> : null}
                {profile.newSmatch ? <SingleSmatchBadge newMessages={profile.newMessages}/> : null}
              </ListItem>
            ))}
          </>
        ) : (
          <NoMatches/>
        )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  currentGroupId: state.groupsInfo.currentGroupId,
  matches: state.matches,
});

const mapDispatchToProps = (dispatch) => ({
  deleteMatch(matchId) {
    dispatch(deleteMatch(matchId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchesScreen);

export function navigateToSmatchAccountScreen(navigation, profile) {
  navigation.navigate("SmatchAccountScreen", {
    image: profile.pictures[0],
    name: profile.name,
    lastSeen: profile.lastSeen,
    fields: profile.fields,
  });
}

function NoMatches() {
  return (
    <View style={styles.noSwipesView}>
      <Text style={styles.noSwipesText}>No Matches!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noSwipesView: {
    alignItems: "center",
  },
  noSwipesText: {
    fontSize: 40,
    color: "red",
  },
});
