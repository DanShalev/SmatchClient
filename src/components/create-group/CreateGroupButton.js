import {TouchableOpacity} from "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import React from "react";
import colors from "../../config/colors";
import {createGroup} from "../../api/SmatchServerAPI";
import {useNavigation} from "@react-navigation/native";

function handleCreateGroup(groupInfo, navigation, groupSetters) {
    createGroup(groupInfo).then(() => alert("Group created"));
    navigation.navigate("Groups")
    groupSetters.setName("")
    groupSetters.setDescription("")
    groupSetters.setFields([])
}

export default function CreateGroupButton({ groupInfo, groupSetters }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
          handleCreateGroup(groupInfo, navigation, groupSetters);
      }}
      style={styles.createGroupButton}
    >
      <Text>Create group</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  createGroupButton: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 17,
    margin: 15,
  }
});