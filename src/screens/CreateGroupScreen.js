import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../config/colors";

export function CreateGroupScreen() {
  let [listOfFields, setListOfFields] = useState([]);

  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>Group details</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Please enter field name</Text>
      </View>
      <InputField setListOfFields={setListOfFields} />
      <ListOfInputFields
        listOfFields={listOfFields}
        setListOfFields={setListOfFields}
      />
      <CreateGroupButton />
    </ScrollView>
  );
}

function InputField({ setListOfFields }) {
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

function ListOfInputFields({ listOfFields, setListOfFields }) {
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

function CreateGroupButton() {
  return (
    <TouchableOpacity
      onPress={() => alert("group created")}
      style={styles.createGroupButton}
    >
      <Text>Create group</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleView: {
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
  },
  textView: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
  },
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
  createGroupButton: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 17,
    margin: 15,
  },
});
