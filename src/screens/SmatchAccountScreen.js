import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { getUserFieldsFromBE } from "../api/SmatchServerAPI";

function SmatchAccountScreen({ route, currentGroupId }) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    getUserFieldsFromBE(route.params.id, currentGroupId, setFields);
  }, [route]);

  return (
    <ScrollView style={styles.background}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: route.params.image,
        }}
      >
        <LinearGradient colors={["transparent", "black"]} style={styles.gradient} />
        <Text style={styles.name}> {route.params.name} </Text>
        <Text style={styles.lastSeen}> {route.params.lastSeen} </Text>
      </ImageBackground>
      <View style={styles.titleView}>
        <Text style={styles.titleText}> Info </Text>
      </View>
      {fields.map((l, i) => (
        <TouchableOpacity style={styles.field} key={i}>
          <Text style={styles.fieldValue}> {l.data} </Text>
          <Text style={styles.fieldName}> {l.name} </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  currentGroupId: state.groups.currentGroupId,
});
export default connect(mapStateToProps, null)(SmatchAccountScreen);

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
