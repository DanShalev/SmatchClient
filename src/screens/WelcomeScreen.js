import React from "react";
import {Image, Text, View} from "react-native";
import { runLoginScheme } from "../api/facebook-login/facebookLoginUtils";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import styles from "./style/WelcomeScreenStyle"

export default function LoginScreen() {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/WelcomeLogo.png")} style={styles.logo} />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Welcome to Smatch!</Text>
                <Text style={styles.introText}>Tap "Login" to start using Smatch</Text>
            </View>
            <View style={styles.form}>
                <Button
                  icon={<Icon name="facebook-square" size={15} color="white"/>}
                  title="   Login Using Facebook"
                  color="navy"
                  onPress={() => runLoginScheme(dispatch)}
                />
            </View>
        </View>
    );
}



