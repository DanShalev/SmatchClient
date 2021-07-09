import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import InputFieldDynamic from "../components/create-group/InputFieldDynamic";
import InputFieldList from "../components/create-group/InputFieldList";
import CreateGroupButton from "../components/create-group/CreateGroupButton";
import Icon from "../components/create-group/PressableIcon";
import { useStore } from "react-redux";
import { appendImagePrefix } from "../redux/actions/actionUtils";

function updateIsFilledTextState(text, setIsTextFilled) {
  if (text.length > 0) {
    setIsTextFilled(true);
  } else {
    setIsTextFilled(false);
  }
}

export function CreateGroupScreen() {
  let [fields, setFields] = useState([]);
  let [currentField, setCurrentField] = useState("");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState(null);
  let [isVisible, setIsVisible] = useState(false);
  let [isGroupNameFilled, setIsGroupNameFilled] = useState(false);
  let [isGroupDescFilled, setIsGroupDescFilled] = useState(false);
  let state = useStore().getState();

  const imagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    allowsEditing: true,
    aspect: [4, 5],
    quality: 0.3,
    base64: true,
  };

  const groupSetters = {
    setName: setName,
    setDescription: setDescription,
    setCurrentField: setCurrentField,
    setFields: setFields,
    setImage: setImage,
    setIsGroupNameFilled: setIsGroupNameFilled,
    setIsGroupDescFilled: setIsGroupDescFilled,
  };

  const launchGallery = async () => {
    handleImage(await ImagePicker.launchImageLibraryAsync(imagePickerOptions));
  };

  const launchCamera = async () => {
    handleImage(await ImagePicker.launchCameraAsync(imagePickerOptions));
  };

  const removeImage = () => {
    setImage(null);
    setIsVisible(false);
  };

  const handleImage = (result) => {
    if (!result.cancelled) {
      setImage(result.base64);
      setIsVisible(false);
    }
  };

  const convertToMap = (fields) => {
    let a = {};
    for (let i = 0; i < fields.length; i++) {
      a[i] = fields[i];
    }
    return a;
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={[styles.image, { marginTop: 20 }]}>
        {image === null ? (
          <FontAwesome name="camera" size={40} color="grey" />
        ) : (
          <Image source={{ uri: appendImagePrefix(image) }} style={styles.image} />
        )}
      </TouchableOpacity>
      <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} style={styles.modal}>
        <View style={styles.modalView}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 22 }}>Upload Image</Text>
          </View>
          <View style={styles.icons}>
            <Icon action={launchGallery} iconName={"images"} color={"grey"} />
            <Icon action={launchCamera} iconName={"camera"} color={"grey"} />
            {image && <Icon action={removeImage} iconName={"trash-alt"} color={"tomato"} />}
          </View>
        </View>
      </Modal>
      <View>
        <TextInput
          style={styles.groupName}
          textAlign={"center"}
          placeholder={"Group Name"}
          value={name}
          keyboardAppearance={"dark"}
          onChangeText={(newName) => {
            updateIsFilledTextState(newName, setIsGroupNameFilled);
            setName(newName);
          }}
          multiline={true}
        />
      </View>
      <View style={[styles.border, { marginTop: 20 }]} />
      <View style={styles.descriptionView}>
        <TextInput
          style={styles.description}
          textAlign={"center"}
          placeholder={"Add a brief description..."}
          value={description}
          keyboardAppearance={"dark"}
          onChangeText={(desc) => {
            updateIsFilledTextState(desc, setIsGroupDescFilled);
            setDescription(desc);
          }}
          multiline={true}
        />
      </View>
      <View style={styles.border} />
      <InputFieldDynamic currentField={currentField} setCurrentField={setCurrentField} setListOfFields={setFields} />
      <ScrollView style={styles.dynamicField}>
        <InputFieldList listOfFields={fields} setListOfFields={setFields} />
      </ScrollView>
      <CreateGroupButton
        groupInfo={{
          userId: state.authentication.authCredentials.facebook_id,
          name: name,
          description: description,
          fields: convertToMap(fields),
          avatar: image,
        }}
        groupSetters={groupSetters}
        disabled={!isGroupNameFilled || !isGroupDescFilled}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 700,
  },
  image: {
    height: 90,
    width: 90,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 200,
    width: 300,
    backgroundColor: "lightgrey",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  groupName: {
    textDecorationColor: "blue",
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  border: {
    borderWidth: 0.5,
    width: "100%",
    borderColor: "lightgrey",
  },
  description: {
    marginVertical: 4,
    marginHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  descriptionView: {
    width: "100%",
    height: 80,
  },
  dynamicField: {
    marginTop: 40,
  },
});
