import React, {useEffect, useState} from "react";
import {ScrollView, Image as RNImage, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import styles from "./style/AccountStyle"
import AccountPicturesUploader from "./AccountPicturesUploader";
import {Image} from "react-native-expo-image-cache";
import {convertToBase64} from "../cache/CacheUtil";

export function Account({pictures, name, fields, disablePictures}) {
  const [images, setImages] = useState([])
  useEffect(() => {
    convertToBase64(pictures).then((result) => setImages(result))
  }, [pictures])

  return (
    <ScrollView style={styles.background}>
      {images && <View>
        {images[0] !== undefined && images[0].startsWith("http") ? (
          <Image style={styles.image} preview={{uri: images[0]}} uri={images[0]}/>
        ) : (
          <RNImage style={styles.image} source={{uri: images[0]}}/>
        )}
        <LinearGradient colors={["transparent", "black"]} style={styles.gradient}/>
        <Text style={styles.name}> {name} </Text>
      </View>}
      <View style={styles.titleView}>
        <Text style={styles.titleText}> Info </Text>
      </View>
      {fields.map((l, i) => (
        <TouchableOpacity disabled style={styles.field} key={i}>
          <Text style={styles.fieldValue}> {l.name} </Text>
          <Text style={styles.fieldName}> {l.data} </Text>
        </TouchableOpacity>
      ))}
      {images && <AccountPicturesUploader disablePictures={disablePictures} pictures={images}/>}
    </ScrollView>
  );
}
