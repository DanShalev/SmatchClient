import * as React from "react";
import { Platform, StyleSheet, SafeAreaView, Image, Text } from "react-native";
import colors from "../../config/colors";

export default function SmatchLogoHeader({ title = "Smatch" }) {
  return (
    <SafeAreaView style={styles.logoContainer}>
      <Image source={require("../../../assets/smatchLogoLarge.png")} style={styles.logoImage} />
      <Text style={styles.logoText}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingLeft: 15,
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
});
