import * as React from "react";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SideMenuHeader({ navigation }) {
  return (
    <SafeAreaView style={styles.sideMenu}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={"ios-menu"}
          color={colors.tertiary}
          size={Platform === "android" ? 35 : 30}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sideMenu: {
    alignItems: "center",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingRight: 7,
  },
});
