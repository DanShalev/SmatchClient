import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";
import colors from "../config/colors";

export default function NavbarProperties() {
  return {
    headerTitle: null,
    headerStatusBarHeight: 25,
    headerRightContainerStyle: { margin: 15 },
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerRight: () => (
      <SafeAreaView style={styles.rightHeader}>
        <Ionicons name={"ios-menu"} size={35} style={styles.sideMenuIcon} />
      </SafeAreaView>
    ),
    headerLeft: () => (
      <SafeAreaView style={styles.leftHeader}>
        <Image
          source={require("../../assets/smatchLogoLarge.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Smatch</Text>
      </SafeAreaView>
    ),
  };
}

const styles = StyleSheet.create({
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
  rightHeader: {
    alignItems: "center",
  },
  sideMenuIcon: {
    color: colors.tertiary,
  },
});
