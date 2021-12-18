import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { runLoginScheme } from "../api/facebook-login/facebookLoginUtils";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import styles from "./style/WelcomeScreenStyle";

export default function LoginScreen() {
  const dispatch = useDispatch();

  return (
    <ImageBackground source={require("../../assets/welcome_page_side_symbol.png")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Make</Text>
        <Text style={styles.titleText}>Ends</Text>
        <Text style={styles.titleText}>Meet</Text>
        <Button buttonStyle={styles.button} icon={<Icon name="facebook-f" size={20} color="white" />}
                title="  Continue With Facebook" onPress={() => runLoginScheme(dispatch)} />
      </View>
    </ImageBackground>
  );
}



