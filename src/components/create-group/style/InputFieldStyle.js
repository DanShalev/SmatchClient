import { StyleSheet } from "react-native";
import colors from "../../../config/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputFieldText: {
    height: 40,
    width: 200,
    borderRadius: 17,
    backgroundColor: colors.lightGray,
    textAlign: "left",
    fontSize: 17,
    marginTop: 12,
    marginRight: 20,
    padding: 5,
  },
});