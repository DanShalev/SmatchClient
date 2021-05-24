import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";

import { MessagesBadge, SingleSmatchBadge } from "../components/Badges";
import { resetSmatchBadge, updateCurrentConversationId } from "../redux/actions/actionCreators";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

function MatchesScreen({ navigation, currentGroupId, matches, updateCurrentConversationId, resetSmatchBadge }) {
  const profiles = matches[currentGroupId];
  const matchesExist = profiles !== undefined && profiles.length !== 0 ? true : undefined;

  let unmatchButtons = [
    {
      text: "Unmatch",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.5)",
      onPress: () => {
        alert("Unmatched");
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {matchesExist ? (
          <>
            {profiles.map((profile, i) => (
              <Swipeout right={unmatchButtons} autoClose={true} backgroundColor="transparent" key={i}>
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
          </>
        ) : (
          <NoMatches />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  currentGroupId: state.mainReducer.currentGroupId,
  matches: state.mainReducer.matches,
});

const mapDispatchToProps = { updateCurrentConversationId, resetSmatchBadge };

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
