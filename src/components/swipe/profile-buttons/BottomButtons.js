import {StyleSheet, View} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";
import React from "react";
import {nonCssStyles} from "./IconStyle";

export function BottomButtons({onLikePressed, onNopePressed}) {
  return (
      <View>
        <View style={styles.footer}>
          <View style={styles.circle}>
            <Icon
              name="x"
              size={nonCssStyles.icons.iconSize}
              color={nonCssStyles.icons.nopeIconColor}
              onPress={onNopePressed}
            />
          </View>
          <View style={styles.circle}>
            <Icon
              name="heart"
              size={nonCssStyles.icons.iconSize}
              color={nonCssStyles.icons.likeIconColor}
              onPress={onLikePressed}
            />
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 2,
  }
});
