import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style/InputFieldListStyle"
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
          <TextInput style={styles.inputFieldText} value={field} editable={false} />
          <TouchableOpacity onPress={() => handleRemoveField(i)}>
            <Icon name="minuscircleo" size={30} color={colors.black} style={styles.inputFieldIcon} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
