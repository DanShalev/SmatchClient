import * as React from "react";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

export default function BackArrowHeader() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.backArrow}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons
          name={"ios-arrow-back"}
          color={colors.tertiary}
          size={Platform === "android" ? 35 : 30}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    alignItems: "center",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingLeft: 7,
  },
});
