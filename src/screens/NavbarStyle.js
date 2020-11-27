import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";

export default function navbarStyle() {
  return {
    headerTitle: null,
    headerStatusBarHeight: 25,
    headerLeftContainerStyle: { padding: 15 },
    headerStyle: {
      backgroundColor: "gray",
    },
    headerLeft: () => (
      <SafeAreaView style={{ alignItems: "center" }}>
        <Ionicons
          type="ionicon"
          name={"ios-menu"}
          size={35}
          style={{ color: "white" }}
        />
      </SafeAreaView>
    ),
    headerRight: () => (
      <SafeAreaView style={styles.rightHeader}>
        <Image
          source={require("../../assets/smatchLogoLarge.png")}
          style={{ tintColor: "tomato" }}
        />
        <Text style={styles.logoText}>Smatch</Text>
      </SafeAreaView>
    ),
  };
}

const styles = StyleSheet.create({
  logoText: {
    alignItems: "center",
    paddingLeft: 15,
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
  rightHeader: {
    alignItems: "center",
    flexDirection: "row-reverse",
    padding: 10,
  },
});
