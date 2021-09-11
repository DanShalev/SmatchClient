import {FontAwesome5} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import React from "react";

export default function Icon({action, iconName, color}) {

  return (
    <TouchableOpacity onPress={action} style={{
      height: 90,
      width: 90,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20
    }}>
      <FontAwesome5 name={iconName} size={45} color={color}/>
    </TouchableOpacity>
  )
}