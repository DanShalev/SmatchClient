import {Alert, StyleSheet, View} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";
import React from "react";
import {nonCssStyles} from "../Profiles";

export function TopButtons() {
  return (
    <View style={styles.header}>
      <Icon
        name="user"
        size={nonCssStyles.icons.iconSize}
        color={nonCssStyles.icons.topIconColor}
        onPress={() => {
          Alert.alert("Profile Button Pressed");
        }}
      />
      <Icon
        name="message-circle"
        size={nonCssStyles.icons.iconSize}
        color={nonCssStyles.icons.topIconColor}
        onPress={() => {
          Alert.alert("Message Box");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  }
});


