import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  sideMenu: {
    alignItems: "center",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingRight: 15,
  },
});