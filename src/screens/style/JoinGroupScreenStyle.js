import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.tertiary
  },
  image: {
    flex: 0.4,
    width: "100%"
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    color: colors.accountTitle,
    fontSize: 25,
    bottom: 40,
  },
  members: {
    marginTop: 5,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.secondary,
  },
  description: {
    fontWeight: "bold",
    marginLeft: 10, marginTop: 15,
    color: colors.primary,
  },
  button: {
    flex: 0.2,
    justifyContent: "center",
    alignSelf: "center",
  },
  gradient: {
    opacity: 0.2,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 355,
    height: "40%",
  },
});

