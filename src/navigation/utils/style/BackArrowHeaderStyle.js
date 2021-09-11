import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  backArrow: {
    alignItems: "center",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingRight: 15,
  },
});
