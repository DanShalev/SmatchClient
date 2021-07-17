import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";
import { addUserToGroup, getAndUpdateGroups } from "../../api/SmatchServerAPI";
import { Share, StyleSheet, Text } from "react-native";
import * as Linking from "expo-linking";
import React from "react";

export function JoinGroupButton({ groupId, updateGroups, loggedUserId, navigation }) {
  return (
    <TouchableOpacity
      style={styles.joinContainer}
      onPress={() => {
        addUserToGroup(groupId, loggedUserId)
          .then(() => navigation.navigate("Home"))
          .then(() => getAndUpdateGroups(loggedUserId, updateGroups));
      }}
    >
      <Text style={styles.text}>Join Group</Text>
    </TouchableOpacity>
  );
}

export function InviteButton({ groupId }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Linking.createURL("join/") + groupId,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.inviteContainer} onPress={() => onShare()}>
      <Text style={styles.text}>Invite a Friend!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inviteContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    width: 200,
    height: 50,
    backgroundColor: colors.secondary,
  },
  text: {
    fontSize: 20,
    color: colors.tertiary,
  },
  joinContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 23,
    width: 200,
    height: 50,
    backgroundColor: colors.secondary,
  },
});
