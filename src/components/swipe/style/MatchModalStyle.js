import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  smatchTextImage: {
    width: 300,
    height: 110,
    borderRadius: 15
  },
  messageText: {
    fontWeight: "bold",
    paddingTop: 9,
    color: "white",
    textAlign: "center",
  },
  messageBox: {
    alignSelf: "center",
    width: 135,
    height: 40,
    backgroundColor: "tomato",
    borderRadius: 30,
    marginTop: 40
  },
  modal: {
    flex: 0.60,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  smatchTextRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  modalImagesRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
  }
});
