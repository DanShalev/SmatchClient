import React, {useState} from "react";
import {FlatList, Image as RNImage, Text, TouchableOpacity, View} from "react-native";
import styles from "./style/AccountPicturesUploaderStyle"
import UploadImageModal from "../create-group/UploadImageModal";
import { useDispatch, useSelector } from "react-redux";
import {removeUserImage, updateUserImage} from "../../api/SmatchServerAPI";
import {reloadUserPictures} from "../../api/SmatchServerAPI";
import {Image} from "react-native-expo-image-cache";
import {appendImagePrefix} from "../../redux/utils/utils";
import { selectUserFacebookId } from "../../redux/slices/authSlice";

export default function AccountPicturesUploader({disablePictures, pictures}) {
  if (disablePictures) {
    return null;
  }
  const [image1, image2, image3] = pictures;
  let [isImage, setIsImage] = useState(null);
  let [imageNum, setImageNum] = useState(null);
  let [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector(selectUserFacebookId);

  const removeImage = async () => {
    await removeUserImage(userId, imageNum);
    setIsVisible(false);
    await reloadUserPictures(userId, dispatch);
  };

  const handleImage = async (result) => {
    if (result.cancelled) {
      return;
    }
    await updateUserImage(userId, imageNum, result.base64);
    setIsVisible(false);
    await reloadUserPictures(userId, dispatch);
  };

  return (
    <View style={styles.picturesContainer}>
      <UploadImageModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        imageExist={isImage}
        setImage={handleImage}
        removeImage={removeImage}
      />
      <Text style={styles.picTitle}> Pictures </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={generateImageArrayWithAddButton(image1, image2, image3)}
        keyExtractor={result => result.id.toString()}
        renderItem={({item, index}) => {
          return !item.image ? null : (
            <TouchableOpacity
              style={styles.imageField}
              onPress={() => {
                setIsImage(!item.isAddImageButton);
                setImageNum(index + 1);
                setIsVisible(true);
              }}
            >
              {item.image.startsWith("http") ? (
                <Image style={styles.imageScroll} uri={appendImagePrefix(item.image)}/>
              ) : (
                <RNImage style={styles.imageScroll} source={{uri: appendImagePrefix(item.image)}}/>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

function generateImageArrayWithAddButton(image1, image2, image3) {
  const images = [image1, image2, image3];
  let filteredImages = [];

  for (let i=1; i <= 3; i++) {
    if (!images[i - 1]) {
      filteredImages.push({
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEJz3VCtKm7BaMyZOUmVkSuCRNnA316u7eWA&usqp=CAU",
        id: i,
        isAddImageButton: true
      });
      break;
    }

    filteredImages.push({image: images[i - 1], id: i});
  }

  return filteredImages;
}
