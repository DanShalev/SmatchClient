import { StyleSheet } from "react-native";
import colors from "../../../config/colors";

export default StyleSheet.create({
  imageScroll: {
    flex: 1,
    height: 250,
    width: 150,
    borderRadius: 15,
    margin: 5,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "black",
  },
  name: {
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 5,
    color: colors.accountTitle,
    fontSize: 25,
  },
  imageField: {
    justifyContent: "center",
    backgroundColor: colors.tertiary,
    height: 230,
  },
  picTitle: {
    paddingTop: 5,
  },
  picturesContainer: {
    marginLeft: 15,
    backgroundColor: colors.tertiary,
  },
});
