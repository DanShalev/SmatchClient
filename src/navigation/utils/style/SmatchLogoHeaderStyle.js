import { Platform, StyleSheet } from "react-native";
import colors from "../../../config/colors";

export default StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingLeft: 15,
  },
  logoText: {
    marginLeft: 15,
    fontSize: 28,
    color: colors.tertiary,
    fontWeight: "bold",
  },
  logoImage: {
    tintColor: colors.secondary,
  },
});
