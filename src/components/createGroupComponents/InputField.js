import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import colors from "../../config/colors";

export default function InputField({ style }) {
  let [fieldValue, setField] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.inputFieldText, style]}
        onChangeText={(text) => setField(text)}
        value={fieldValue}
        textAlignVertical={"top"}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputFieldText: {
    height: 40,
    width: 200,
    borderRadius: 17,
    backgroundColor: colors.inputBox,
    textAlign: "left",
    fontSize: 17,
    marginTop: 12,
    marginRight: 20,
    padding: 5,
  },
});
