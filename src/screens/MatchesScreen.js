import {ScrollView} from "react-native";
import MatchesScreenMocks from "../../mocks/MatchesScreenMocks";
import {Avatar, ListItem} from "react-native-elements";
import React from "react";
import ConversationScreen from "./ConversationScreen";

import {MessagesBadge, SingleSmatchBadge} from "../components/Badges";

export default function MatchesScreen({ navigation }) {
    return (
        <ScrollView>
            {MatchesScreenMocks.map((l, i) => (
                <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => navigation.navigate("ConversationScreen")}
                >
                    <Avatar source={{ uri: l.avatar_url }} size='large' rounded />
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



