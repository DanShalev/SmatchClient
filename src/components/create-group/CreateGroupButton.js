import {TouchableOpacity} from "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import React, {useEffect} from "react";
import colors from "../../config/colors";
import {createGroup} from "../../api/SmatchServerAPI";
import {useNavigation} from "@react-navigation/native";

function handleCreateGroup(groupInfo, navigation, groupSetters) {
  createGroup(groupInfo).then(() => alert("Group created"));
  groupSetters.setName("")
  groupSetters.setDescription("")
  groupSetters.setFields([])
  groupSetters.setImage(null)
  navigation.navigate("Groups")
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
      <Text style={{fontSize: 18, color: "white"}}>Done</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  createGroupButton: {
    width: 250,
    marginTop: 80,
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 15,
    margin: 15,
  }
});