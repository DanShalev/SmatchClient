import { Badge } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

export function SmatchesBadge({ newMessages, newSmatches }) {
  return (
    <Badge
      badgeStyle={styles.SmatchesBadge}
      textStyle={styles.badgeText}
      value={newSmatches}
      containerStyle={newMessages !== 0 ? styles.badgeOneContainer : styles.badgeTwoContainer}
    />
  );
}

export function SingleSmatchBadge({ newMessages }) {
  return (
    <Badge
      badgeStyle={styles.SmatchesBadge}
      textStyle={styles.badgeText}
      containerStyle={newMessages !== 0 ? styles.badgeOneContainer : styles.badgeTwoContainer}
    />
  );
}

export function MessagesBadge({ newMessages }) {
  return (
    <Badge badgeStyle={styles.MessagesBadge} textStyle={styles.badgeText} value={newMessages} containerStyle={styles.badgeTwoContainer} />
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
