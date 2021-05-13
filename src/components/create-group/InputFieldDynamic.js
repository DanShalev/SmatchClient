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
        placeholder={"Add group field..."}
      />
      <Icon
        name="pluscircleo"
        size={30}
        color={colors.black}
        style={styles.inputFieldIcon}
        onPress={() => {
          if (currentField) {
            handleAddField(currentField);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50
  },
  inputFieldText: {
    height: 40,
    width: 200,
    borderRadius: 15,
    backgroundColor: "lightgrey",
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
