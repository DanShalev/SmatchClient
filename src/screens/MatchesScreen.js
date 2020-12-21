import {Alert, Button, ScrollView, StyleSheet, Text} from "react-native";
import MatchesScreenMocks from "../../mocks/MatchesScreenMocks";
import {Avatar, ListItem} from "react-native-elements";
import colors from "../config/colors";
import React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import ConversationScreen from "./ConversationScreen";

export default function MatchesScreen({ navigation }) {
    return (
        <ScrollView>
            {MatchesScreenMocks.map((l, i) => (
                <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => navigation.navigate("ConversationScreen")}
                >
                    <Avatar
                        title={l.avatar_title}
                        overlayContainerStyle={{ backgroundColor: colors.primary }}
                        rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    addGroupButton: {
        marginTop: 30,
        alignItems: "center",
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 17,
        margin: 15,
    },
});
