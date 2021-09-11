import { TouchableOpacity } from "react-native-gesture-handler";
import { addUserToGroup, getAndUpdateGroups } from "../../api/SmatchServerAPI";
import { Share, Text } from "react-native";
import * as Linking from "expo-linking";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./JoinGroupUtilsStyle"

export function JoinGroupButton({ groupId, loggedUserId, navigation }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.joinContainer}
      onPress={() => {
        addUserToGroup(groupId, loggedUserId)
          .then(() => navigation.navigate("Home"))
          .then(() => getAndUpdateGroups(loggedUserId, dispatch));
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