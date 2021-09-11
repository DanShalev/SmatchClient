import { Badge } from "react-native-elements";
import React from "react";
import styles from "./BadgesStyle"

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