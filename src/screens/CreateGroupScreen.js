import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import colors from "../config/colors";
import InputFieldDynamic from "../components/createGroupComponents/InputFieldDynamic";
import InputField from "../components/createGroupComponents/InputField";
import InputFieldList from "../components/createGroupComponents/InputFieldList";

export function CreateGroupScreen() {
  let [listOfFields, setListOfFields] = useState([]);

  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>Group details</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Name</Text>
        <InputField style={styles.name} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Description</Text>
        <InputField style={styles.description} />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Group fields</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Please enter field name</Text>
      </View>
      <InputFieldDynamic setListOfFields={setListOfFields}/>
      <InputFieldList
        listOfFields={listOfFields}
        setListOfFields={setListOfFields}
      />
      <CreateGroupButton/>
    </ScrollView>
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
  createGroupButton: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 17,
    margin: 15,
  },
  name: {
    height: 40,
    width: 350,
  },
  description: {
    height: 150,
    width: 350,
  },
  textView: {
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
  },
  titleView: {
    alignSelf: "center",
    marginVertical: 15,
  },
  title: {
    fontSize: 30,
  },
});
