import {Image, RefreshControl, SafeAreaView, ScrollView, Text, View} from 'react-native';
import { Avatar, ListItem } from "react-native-elements";
import styles from "./style/MatchScreenStyle"
import React from "react";
import { MessagesBadge, SingleSmatchBadge } from "../components/badge/Badges";
import { useDispatch, useSelector } from "react-redux";
import Swipeout from "react-native-swipeout";
import { unmatch } from "../api/SmatchServerAPI";
import { updateGroupsProfilesAndMatches } from "../api/SmatchServerAPI";
import { selectUserFacebookId } from "../redux/slices/authSlice";
import { selectCurrentGroupId } from "../redux/slices/groupsSlice";
import { deleteMatch, selectMatches } from "../redux/slices/matchesSlice";
import { updateCurrentConversationId } from "../redux/slices/conversationSlice";
import { updateMatchAndGroupBadges } from "./utils/ScreenUtils";

export default function MatchesScreen({navigation}) {
  const currentGroupId = useSelector(selectCurrentGroupId);
  const matches = useSelector(selectMatches);
  const profiles = matches[currentGroupId];
  const matchesExist = profiles !== undefined && profiles.length !== 0 ? true : undefined;
  const [refreshing, setRefreshing] = React.useState(false);

  const loggedUserId = useSelector(selectUserFacebookId);
  const dispatch = useDispatch();

  const unmatchButtons = (otherUserId) => [
    {
      text: "Unmatch",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.5)",
      onPress: () => {
        unmatch(currentGroupId, loggedUserId, otherUserId)
          .then(() => dispatch(deleteMatch({otherUserId, currentGroupId})))
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
    updateGroupsProfilesAndMatches(loggedUserId, dispatch, currentGroupId, matches);
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
                    dispatch(updateCurrentConversationId({user: profile, group: currentGroupId}));
                    updateMatchAndGroupBadges(profile.id,currentGroupId,matches,dispatch)
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
