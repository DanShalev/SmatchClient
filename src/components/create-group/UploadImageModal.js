import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Icon from "./PressableIcon";
import * as ImagePicker from "expo-image-picker";

export default function UploadImageModal({isVisible, setIsVisible, imageExist, setImage, removeImage}) {
  const imagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    allowsEditing: true,
    aspect: [4, 5],
    quality: 0.3,
    base64: true,
  };

  const launchGallery = async () => {
    setImage(await ImagePicker.launchImageLibraryAsync(imagePickerOptions));
  };

  const launchCamera = async () => {
    setImage(await ImagePicker.launchCameraAsync(imagePickerOptions));
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} style={styles.modal}>
      <View style={styles.modalView}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 22 }}>Upload Image</Text>
        </View>
        <View style={styles.icons}>
          <Icon action={launchGallery} iconName={"images"} color={"grey"} />
          <Icon action={launchCamera} iconName={"camera"} color={"grey"} />
          {imageExist && <Icon action={removeImage} iconName={"trash-alt"} color={"tomato"} />}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  }
});
