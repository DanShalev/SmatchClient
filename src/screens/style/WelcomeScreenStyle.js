import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 3,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
  button: {
    backgroundColor: '#68a0cf',
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 30
  },
  introText: {
    fontSize: 12
  }
});