import { StyleSheet } from "react-native";
import colors from "../../../config/colors";

export default StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: colors.lightGray,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  }
});