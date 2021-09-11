import React from "react";
import { TextInput, View } from "react-native";
import styles from "./style/InputFieldStyle"

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

