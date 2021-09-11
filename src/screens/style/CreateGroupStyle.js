import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 700,
  },
  image: {
    height: 90,
    width: 90,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  groupName: {
    textDecorationColor: "blue",
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  border: {
    borderWidth: 0.5,
    width: "100%",
    borderColor: "lightgrey",
  },
  description: {
    marginVertical: 4,
    marginHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  descriptionView: {
    width: "100%",
    height: 80,
  },
  dynamicField: {
    marginTop: 40,
  },
  dropdownButton: {
    marginTop: 40,
    backgroundColor: colors.lightGray,
    borderRadius: 17,
    width: 270
  },
  dropdownOptions: {
    backgroundColor: colors.tertiary,
    borderRadius: 17
  }
});
