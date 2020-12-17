import { Platform } from "react-native";
import colors from "../config/colors";

export default function HomeScreeNavBar() {
  return {
    headerShown: true,
    headerTitle: null,
    gestureEnabled: true,
    headerStatusBarHeight: Platform === "android" ? 25 : 45,
    headerRightContainerStyle: { margin: 15 },
    headerStyle: {
      backgroundColor: colors.primary,
    },
  };
}
