import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#40C4F5"
  },
  image: {
    height: 272,
    width: "100%"
  },
  groupName: {
    fontFamily: "Assistant_400Regular",
    fontSize: 36,
    color: "white",
    marginTop: 15
  },
  members: {
    fontFamily: "Assistant_400Regular",
    fontSize: 18,
    marginTop: 15
  },
  description: {
    fontFamily: "Assistant_300Light",
    fontSize: 18,
    marginTop: 15,
    marginLeft: 30,
    textAlign: "center",
    flexShrink: 1
  },
  button: {
    height: 45,
    width: 45,
    borderRadius: 22,
    backgroundColor: "white",
    marginTop: 35,
    marginBottom: 20
  }

});
