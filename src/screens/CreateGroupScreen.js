import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import InputFieldDynamic from "../components/create-group/InputFieldDynamic";
import InputField from "../components/create-group/InputField";
import InputFieldList from "../components/create-group/InputFieldList";
import CreateGroupButton from "../components/create-group/CreateGroupButton";

export function CreateGroupScreen() {
  let [fields, setFields] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");

  const groupSetters = {
      setName: setName,
      setDescription: setDescription,
      setFields: setFields,
  }

  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>Group details</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Name</Text>
        <InputField style={styles.name} fieldValue={name} setFieldValue={setName}/>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Description</Text>
        <InputField style={styles.description} fieldValue={description} setFieldValue={setDescription}/>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Group fields</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Please enter field name</Text>
      </View>
      <InputFieldDynamic setListOfFields={setFields}/>
      <InputFieldList
        listOfFields={fields}
        setListOfFields={setFields}
      />
      <CreateGroupButton groupInfo={{
          name: name,
          description: description,
          fields: fields,} }
            groupSetters={groupSetters}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
