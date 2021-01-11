import { ScrollView } from "react-native";
import MatchesScreenMocks from "../../mocks/MatchesScreenMocks";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";

import { MessagesBadge, SingleSmatchBadge } from "../components/Badges";

export default function MatchesScreen({ navigation }) {
  return (
    <ScrollView>
      {MatchesScreenMocks.map((l, i) => (
        <ListItem key={i} bottomDivider onPress={() => navigation.navigate("ConversationScreen")}>
          <Avatar source={{ uri: l.avatar_url }} size="large" rounded onPress={() => navigateToSmatchAccountScreen(navigation, l)}/>
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          {l.newMessages !== 0 ? <MessagesBadge item={l} /> : null}
          {l.newSmatch ? <SingleSmatchBadge item={l} /> : null}
        </ListItem>
      ))}
    </ScrollView>
  );
}

export function navigateToSmatchAccountScreen(navigation, smatchAccount) {
  navigation.navigate("SmatchAccountScreen", {
    image: smatchAccount.avatar_url,
    name: smatchAccount.name,
    subtitle: smatchAccount.subtitle,
    fields: [
      { title: "Age", value: smatchAccount.age },
      { title: "Sex", value: smatchAccount.sex },
    ],
  });
}
