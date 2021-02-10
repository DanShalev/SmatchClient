import { ScrollView } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";
import { indiaTripPartnersMatches } from "../../mocks/MatchesMocks";

import { MessagesBadge, SingleSmatchBadge } from "../components/Badges";

export default function MatchesScreen({ navigation, route }) {
  const matches = indiaTripPartnersMatches;

  return (
    <ScrollView>
      {matches.map((profile, i) => (
        <ListItem key={i} bottomDivider onPress={() => navigation.navigate("ConversationScreen")}>
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
      ))}
    </ScrollView>
  );
}

export function navigateToSmatchAccountScreen(navigation, profile) {
  navigation.navigate("SmatchAccountScreen", {
    image: profile.pictures[0],
    name: profile.name,
    lastSeen: profile.lastSeen,
    fields: profile.fields,
  });
}
