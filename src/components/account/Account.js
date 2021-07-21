import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
import { appendImagePrefix } from "../../redux/actions/actionUtils";
import AccountPicturesUploader from "./AccountPicturesUploader";

export function Account({pictures, name, fields, disablePictures}) {
  return (
    <ScrollView style={styles.background}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: appendImagePrefix(pictures[0]),
        }}
      >
        <LinearGradient colors={["transparent", "black"]} style={styles.gradient} />
        <Text style={styles.name}> {name} </Text>
      </ImageBackground>
      <View style={styles.titleView}>
        <Text style={styles.titleText}> Info </Text>
      </View>
      {fields.map((l, i) => (
        <TouchableOpacity disabled style={styles.field} key={i}>
          <Text style={styles.fieldValue}> {l.name} </Text>
          <Text style={styles.fieldName}> {l.data} </Text>
        </TouchableOpacity>
      ))}

      <AccountPicturesUploader
        disablePictures={disablePictures}
        pictures={pictures}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.tertiary,
  },
  image: {
    flex: 1,
    height: 250,
    justifyContent: "flex-end",
  },
  imageScroll: {
    flex: 1,
    height: 250,
    width: 150,
    borderRadius: 15,
    margin: 5,
    justifyContent: "flex-end",
  },
  name: {
    fontWeight: "bold",
    marginLeft: 3,
    marginBottom: 5,
    color: colors.accountTitle,
    fontSize: 25,
  },
  lastSeen: {
    marginLeft: 10,
    marginBottom: 10,
    color: colors.accountTitle,
    fontSize: 10,
  },
  field: {
    justifyContent: "center",
    backgroundColor: colors.tertiary,
    height: 60,
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
  fieldName: {
    marginLeft: 15,
    fontSize: 10,
    color: colors.primary,
    textAlign: "left",
  },
  fieldValue: {
    marginLeft: 15,
  },
  titleView: {
    backgroundColor: colors.tertiary,
    height: 40,
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    marginLeft: 15,
    color: colors.secondary,
  },
  gradient: {
    opacity: 0.6,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
});
