import * as React from "react";
import { SafeAreaView, Image, Text } from "react-native";
import styles from "./style/SmatchLogoHeaderStyle"

export default function SmatchLogoHeader({ title = "Smatch" }) {
  return (
    <SafeAreaView style={styles.logoContainer}>
      <Image source={require("../../../assets/smatchLogoLarge.png")} style={styles.logoImage} />
      <Text style={styles.logoText}>{title}</Text>
    </SafeAreaView>
  );
}