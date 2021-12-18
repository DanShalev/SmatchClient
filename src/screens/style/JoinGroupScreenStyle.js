import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    alignItems: "center",
  },
  image: {
    width: 230,
    height: 230,
    borderRadius: 230 / 2,
    marginTop: 80
  },
  name: {
    fontFamily: "Assistant_400Regular",
    color: "#0B6CF4",
    fontSize: 36,
    marginTop: 20
  },
  members: {
    fontFamily: "Assistant_400Regular",
    fontSize: 18,
    marginTop: 5
  },
  description: {
    marginLeft: 30,
    textAlign:"center",
    flexShrink: 1,
    fontFamily: "Assistant_300Light",
    fontSize: 18,
    marginTop: 20
  },
  button: {
    flex: 0.2,
    justifyContent: "center",
    alignSelf: "center"
  },
  gradient: {
    opacity: 0.2,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 355,
    height: "40%"
  },
  joinButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    width: 251,
    height: 45,
    backgroundColor: "#F55600",
    marginTop: 50,
    marginBottom: 60
  },
  joinButtonText: {
    fontFamily: "Assistant_600SemiBold",
    fontSize: 24,
  }
});

