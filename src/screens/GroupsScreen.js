import { ScrollView } from "react-native";
import HomeScreenMocks from "../../mocks/HomeScreenMocks";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";

import { SmatchesBadge, MessagesBadge } from "../components/Badges";

export default function GroupsScreen({ navigation }) {
  return (
    <ScrollView>
      {HomeScreenMocks.map((l, i) => (
        <ListItem key={i} bottomDivider onPress={() => navigation.navigate("SwipeScreen")}>
          <Avatar source={{ uri: l.avatar_url }} size="large" rounded />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
          {l.newSmatches !== 0 ? <SmatchesBadge item={l} /> : null}
          {l.newMessages !== 0 ? <MessagesBadge item={l} /> : null}
        </ListItem>
      ))}
    </ScrollView>
  );
}
