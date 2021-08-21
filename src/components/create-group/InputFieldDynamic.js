import React from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../../config/colors";

export default function InputFieldDynamic({ currentField, setCurrentField, setListOfFields }) {
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (currentField) {
            handleAddField(currentField);
          }
        }}
      >
        <Icon name="pluscircleo" size={30} color={currentField ? colors.icon : colors.primary} style={styles.inputFieldIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  inputFieldText: {
    height: 40,
    width: 200,
    borderRadius: 15,
    backgroundColor: "lightgrey",
    textAlign: "left",
    fontSize: 17,
    marginRight: 20,
    paddingLeft: 20,
  },
  inputFieldIcon: {
    alignSelf: "center",
  },
  button: {
    marginTop: 3,
  },
});
