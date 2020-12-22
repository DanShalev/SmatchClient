import { Badge } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

export function SmatchesBadge({ item }) {
  return (
    <Badge
      badgeStyle={styles.SmatchesBadge}
      textStyle={styles.badgeText}
      value={item.newSmatches}
      containerStyle={item.newMessages !== 0 ? styles.badgeOneContainer : styles.badgeTwoContainer}
    />
  );
}

export function SingleSmatchBadge({ item }) {
  return (
    <Badge
      badgeStyle={styles.SmatchesBadge}
      textStyle={styles.badgeText}
      containerStyle={item.newMessages !== 0 ? styles.badgeOneContainer : styles.badgeTwoContainer}
    />
  );
}

export function MessagesBadge({ item }) {
  return (
    <Badge
      badgeStyle={styles.MessagesBadge}
      textStyle={styles.badgeText}
      value={item.newMessages}
      containerStyle={styles.badgeTwoContainer}
    />
  );
}

const styles = StyleSheet.create({
  SmatchesBadge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18,
    backgroundColor: colors.secondary,
  },
  MessagesBadge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18,
    backgroundColor: colors.messagesNotification,
  },
  badgeOneContainer: {
    position: "absolute",
    left: 330,
    top: 45,
  },
  badgeTwoContainer: {
    position: "absolute",
    left: 355,
    top: 45,
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0,
  },
});
