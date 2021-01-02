import {TouchableOpacity} from "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import React from "react";
import colors from "../../config/colors";

export default function CreateGroupButton() {
  return (
    <TouchableOpacity
      onPress={() => alert("group created")}
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