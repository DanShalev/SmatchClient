import React, {useState} from "react";
import {FlatList, StyleSheet, Image as RNImage, Text, TouchableOpacity, View} from "react-native";
import colors from "../../config/colors";
import UploadImageModal from "../create-group/UploadImageModal";
import {connect} from "react-redux";
import {removeUserImage, updateUserImage} from "../../api/SmatchServerAPI";
import {setCurrentUserPictures} from "../../redux/actions/actionCreators";
import {reloadUserPictures} from "../../redux/utils/utils";
import {Image} from "react-native-expo-image-cache";
import {appendImagePrefix} from "../../redux/actions/actionUtils";

function AccountPicturesUploader({disablePictures, pictures, userId, setCurrentUserPictures}) {
  if (disablePictures) {
    return null;
  }
  const [image1, image2, image3] = pictures;
  let [isImage, setIsImage] = useState(null);
  let [imageNum, setImageNum] = useState(null);
  let [isVisible, setIsVisible] = useState(false);

  const removeImage = async () => {
    await removeUserImage(userId, imageNum);
    setIsVisible(false);
    await reloadUserPictures(userId, setCurrentUserPictures);
  };

  const handleImage = async (result) => {
    if (result.cancelled) {
      return;
    }
    await updateUserImage(userId, imageNum, result.base64);
    setIsVisible(false);
    await reloadUserPictures(userId, setCurrentUserPictures);
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
const mapStateToProps = (state) => ({
  userId: state.mainReducer.currentUserData.id,
});
const mapDispatchToProps = {
  setCurrentUserPictures,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPicturesUploader);

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

const styles = StyleSheet.create({
  imageScroll: {
    flex: 1,
    height: 250,
    width: 150,
    borderRadius: 15,
    margin: 5,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "black",
  },
  name: {
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 5,
    color: colors.accountTitle,
    fontSize: 25,
  },
  imageField: {
    justifyContent: "center",
    backgroundColor: colors.tertiary,
    height: 230,
  },
  picTitle: {
    paddingTop: 5,
  },
  picturesContainer: {
    marginLeft: 15,
    backgroundColor: colors.tertiary,
  },
});
