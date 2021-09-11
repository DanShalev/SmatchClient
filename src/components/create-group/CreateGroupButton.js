import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import React from "react";
import styles from "./style/CreateGroupButtonStyle"
import { createGroup } from "../../api/SmatchServerAPI";
import { useNavigation } from "@react-navigation/native";

function handleCreateGroup(groupInfo, navigation, groupSetters) {
  createGroup(groupInfo).then(() => alert("Group created"));
  groupSetters.setName("");
  groupSetters.setDescription("");
  groupSetters.setCurrentField("");
  groupSetters.setFields([]);
  groupSetters.setImage(null);
  groupSetters.setIsGroupNameFilled(false);
  groupSetters.setIsGroupDescFilled(false);
  groupSetters.dropdownRef.current.reset()
  navigation.navigate("Groups");
}

export default function CreateGroupButton({ groupInfo, groupSetters, disabled }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        handleCreateGroup(groupInfo, navigation, groupSetters);
      }}
      style={[styles.createGroupButton, disabled ? styles.disabledColor : styles.enabledColor]}
      disabled={disabled}
    >
      <Text style={{ fontSize: 18, color: "white" }}>Create group</Text>
    </TouchableOpacity>
  );
}
