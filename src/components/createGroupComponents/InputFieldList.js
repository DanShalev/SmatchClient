import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../../config/colors";

export default function InputFieldList({ listOfFields, setListOfFields }) {
  function handleRemoveField(id) {
    const newList = listOfFields.filter((field, i) => i !== id);
    setListOfFields(() => newList);
  }
  return (
    <View>
      {listOfFields.map((field, i) => (
        <View key={i} style={styles.inputFieldView}>
          <TextInput
            style={styles.inputFieldText}
            value={field}
            editable={false}
          />
          <Icon
            name="minuscircleo"
            size={30}
            color={colors.black}
            style={styles.inputFieldIcon}
            onPress={() => handleRemoveField(i)}
          />
        </View>
      ))}
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
