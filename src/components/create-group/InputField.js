import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import colors from "../../config/colors";

export default function InputField({ style, fieldValue, setFieldValue }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.inputFieldText, style]}
        onChangeText={(text) => setFieldValue(text)}
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
    backgroundColor: colors.lightGray,
    textAlign: "left",
    fontSize: 17,
    marginTop: 12,
    marginRight: 20,
    padding: 5,
  },
});
