import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flexDirection: "column",
    flex:1,
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center"
  },
  form: {
    flex: 1
    // justifyContent: "center",
    // width: "80%",
  },
  button: {
    backgroundColor:"#F55600",
    borderRadius:22,
    width: 230,
    marginLeft: 30,
    marginTop:80
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  titleText: {
    fontFamily: "Assistant_700Bold",
    fontSize: 48,
    marginLeft: 30,
    alignItems: "center"
  },
  introText: {
    fontSize: 12
  }
});