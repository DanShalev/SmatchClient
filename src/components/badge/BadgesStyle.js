import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
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
