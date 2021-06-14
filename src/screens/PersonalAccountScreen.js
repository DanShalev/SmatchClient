import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import UserField from "../components/account/UserField";
import {
  addMessage,
  deleteGroup,
  deleteMatchesByGroupId, setLoggedOutCredentials, updateCurrentGroupId,
  updateGroups,
  updateMatches,
  updateProfiles
} from "../redux/actions/actionCreators";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

function PersonalAccountScreen({ currentUserData }) {
  const { name, age, gender, picture } = currentUserData;

  return (
  <ScrollView style={styles.background}>
    <ImageBackground
      style={styles.image}
      // source={{
      //   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVwB80Syes2p3QDnG1mMZ9NQQFxdC5U1Hobg&usqp=CAU",
      // }}
      source={picture}
    >
      <LinearGradient colors={["transparent", "black"]} style={styles.gradient} />
      <Text style={styles.name}> {name} </Text>
    </ImageBackground>
    <View style={styles.titleView}>
      <Text style={styles.titleText}> Info </Text>
    </View>
    <TouchableOpacity style={styles.field}>
      <Text style={styles.fieldValue}> {age.toString()} </Text>
      <Text style={styles.fieldName}> Age </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.field}>
      <Text style={styles.fieldValue}> {gender} </Text>
      <Text style={styles.fieldName}> Gender </Text>
    </TouchableOpacity>
  </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  currentUserData: state.mainReducer.currentUserData,
});
export default connect(mapStateToProps, null)(PersonalAccountScreen);


const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    height: 250,
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
  fieldName: {
    marginLeft: 15,
    fontSize: 10,
    color: colors.primary,
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
