import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

export default function UserField({ iconName, initialState }) {
  let [fieldValue, setField] = useState(initialState);
  return (
    <View style={styles.fieldContainer}>
      <MaterialCommunityIcons style={styles.icon} name={iconName} size={30} color={colors.primary} />
      <TextInput editable={false} style={styles.inputFieldText} onChangeText={(text) => setField(text)} value={fieldValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  Icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  inputFieldText: {
    height: 40,
    width: "80%",
    borderRadius: 25,
    backgroundColor: colors.inputBoxLight,
    textAlign: "left",
    fontSize: 17,
    color: colors.primary,
    marginLeft: 10,
    paddingLeft: 7,
  },
});
