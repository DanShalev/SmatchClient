import { StyleSheet } from "react-native";
import colors from "../../../config/colors";

export default StyleSheet.create({
  createGroupButton: {
    height: 50,
    width: 300,
    alignItems: "center",
    marginTop: 30,
    padding: 10,
    borderRadius: 15,
  },
  enabledColor: {
    backgroundColor: colors.secondary,
  },
  disabledColor: {
    backgroundColor: colors.lightGray,
  },
});
