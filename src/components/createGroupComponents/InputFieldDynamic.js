import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../../config/colors";

export default function InputFieldDynamic({ setListOfFields }) {
  let [currentField, setCurrentField] = useState("");

  function handleAddField(field) {
    setCurrentField("");
    setListOfFields((oldArray) => [...oldArray, field]);
  }
  return (
    <View style={styles.inputFieldView}>
      <TextInput
        style={styles.inputFieldText}
        onChangeText={(text) => setCurrentField(text)}
        value={currentField}
      />
      <Icon
        name="pluscircleo"
        size={30}
        color={colors.black}
        style={styles.inputFieldIcon}
        onPress={() => {
          handleAddField(currentField);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputFieldText: {
    height: 40,
    width: 200,
    borderRadius: 17,
    backgroundColor: colors.inputBox,
    textAlign: "center",
    fontSize: 17,
    marginTop: 12,
    marginRight: 20,
  },
  inputFieldIcon: {
    alignSelf: "center",
    marginTop: 12,
  },
});
