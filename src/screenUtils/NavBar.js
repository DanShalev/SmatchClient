import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";

export default function NavBarProperties({ navigation }) {
  return {
    headerTitle: null,
    headerStatusBarHeight: Platform === "android" ? 25 : 45,
    headerRightContainerStyle: { margin: 15 },
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerRight: () => <HeaderRight navigation={navigation} />,
    headerLeft: () => <HeaderLeft />,
  };
}

export function HeaderRight({ navigation }) {
  return (
    <SafeAreaView style={styles.rightHeader}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons
          name={"ios-menu"}
          color={colors.tertiary}
          size={Platform === "android" ? 35 : 25}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export function HeaderLeft() {
  return (
    <SafeAreaView style={styles.leftHeader}>
      <Image
        source={require("../../assets/smatchLogoLarge.png")}
        style={styles.logoImage}
      />
      <Text style={styles.logoText}>Smatch</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rightHeader: {
    alignItems: "center",
    marginTop: Platform === "android" ? 0 : -5,
  },
  logoText: {
    marginLeft: 15,
    fontSize: 28,
    color: colors.tertiary,
    fontWeight: "bold",
  },
  logoImage: {
    tintColor: colors.secondary,
  },
  leftHeader: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
});
