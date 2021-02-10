import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getUserSubscriptions } from "../api/SmatchServerAPI";
import { Avatar, ListItem } from "react-native-elements";
import { groups } from "../../mocks/GroupsMocks";
import React from "react";

import { SmatchesBadge, MessagesBadge } from "../components/Badges";

export default function GroupsScreen({ navigation }) {
  const [userSubscriptions, setUserSubscriptions] = useState(groups);
  useEffect(() => {
    getUserSubscriptions("1").then((result) => setUserSubscriptions(result ? result : groups));
  }, []);

  return (
    <ScrollView>
      {userSubscriptions.map((group, i) => (
        <ListItem key={i} bottomDivider onPress={() => navigateToSwipeScreen(navigation, group)}>
          <Avatar source={{ uri: group.avatarUrl }} size="large" rounded />
          <ListItem.Content>
            <ListItem.Title>{group.name}</ListItem.Title>
            <ListItem.Subtitle>{group.numberOfMembers}</ListItem.Subtitle>
          </ListItem.Content>
          {group.newSmatches !== 0 ? <SmatchesBadge newMessages={group.newMessages} newSmatches={group.newSmatches} /> : null}
          {group.newMessages !== 0 ? <MessagesBadge newMessages={group.newMessages} /> : null}
        </ListItem>
      ))}
    </ScrollView>
  );
}

export function navigateToSwipeScreen(navigation, group) {
  navigation.navigate("Home", {
    // While navigating to deeply nested navigators, remember each navigator has its own params
    screen: "SwipeScreen",
    params: {
      screen: "Swipe",
      params: {
        profiles: group.profiles,
        matches: group.matches,
        groupId: group.id,
      },
    },
  });
}
