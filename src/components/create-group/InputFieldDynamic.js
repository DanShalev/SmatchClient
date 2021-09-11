import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style/InputFieldDynamicStyle"

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
