import { View} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";
import React from "react";
import {nonCssStyles} from "./IconStyle";
import styles from "./BottomButtonStyle"

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