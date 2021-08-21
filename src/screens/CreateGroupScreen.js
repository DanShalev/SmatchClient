import React, {useRef, useState} from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import InputFieldDynamic from "../components/create-group/InputFieldDynamic";
import InputFieldList from "../components/create-group/InputFieldList";
import CreateGroupButton from "../components/create-group/CreateGroupButton";
import {connect} from "react-redux";
import {appendImagePrefix} from "../redux/actions/actionUtils";
import UploadImageModal from "../components/create-group/UploadImageModal";
import SelectDropdown from 'react-native-select-dropdown'
import colors from '../config/colors';

function updateIsFilledTextState(text, setIsTextFilled) {
  if (text.length > 0) {
    setIsTextFilled(true);
  } else {
    setIsTextFilled(false);
  }
}

function CreateGroupScreen({userId}) {
  let [fields, setFields] = useState([]);
  let [currentField, setCurrentField] = useState("");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState(null);
  let [category, setCategory] = useState("");
  let [isVisible, setIsVisible] = useState(false);
  let [isGroupNameFilled, setIsGroupNameFilled] = useState(false);
  let [isGroupDescFilled, setIsGroupDescFilled] = useState(false);
  const dropdownRef = useRef({});

    const groupSetters = {
    setName: setName,
    setDescription: setDescription,
    setCurrentField: setCurrentField,
    setFields: setFields,
    setImage: setImage,
    setIsGroupNameFilled: setIsGroupNameFilled,
    setIsGroupDescFilled: setIsGroupDescFilled,
    dropdownRef: dropdownRef
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
      <UploadImageModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        imageExist={image}
        setImage={handleImage}
        removeImage={removeImage}
      />
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
        <SelectDropdown
            data={categories}
            defaultButtonText="Select a category"
            onSelect={(selectedItem) => {
                setCategory(selectedItem)
            }}
            ref={dropdownRef}
            dropdownStyle={styles.dropdownOptions}
            buttonStyle={styles.dropdownButton}
        />
        <InputFieldDynamic currentField={currentField} setCurrentField={setCurrentField} setListOfFields={setFields} />
      <ScrollView style={styles.dynamicField}>
        <InputFieldList listOfFields={fields} setListOfFields={setFields} />
      </ScrollView>
      <CreateGroupButton
        groupInfo={{
          userId: userId,
          name: name,
          description: description,
          fields: convertToMap(fields),
          avatar: image,
          category: category
        }}
        groupSetters={groupSetters}
        disabled={!isGroupNameFilled || !isGroupDescFilled}
      />
    </ScrollView>
  );
}

const categories = ["Travel", "Sport", "Dating", "Games", "Education", "Other"]


const mapStateToProps = (state) => ({
  userId: state.authentication.authCredentials.facebook_id,
});

export default connect(mapStateToProps)(CreateGroupScreen);

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
  dropdownButton: {
      marginTop: 40,
      backgroundColor: colors.lightGray,
      borderRadius: 17,
      width: 270
  },
  dropdownOptions: {
      backgroundColor: colors.tertiary,
      borderRadius: 17
  }
});
