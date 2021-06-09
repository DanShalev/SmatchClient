import React from "react";
import {Button, Image, StyleSheet, Text, View} from "react-native";
import { logInUsingFacebookApi } from "../api/facebook-login/facebookLoginUtils";

function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/WelcomeLogo.png")} style={styles.logo} />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Welcome to Smatch!</Text>
                <Text style={styles.introText}>Tap "Login" to start using Smatch</Text>
            </View>
            <View style={styles.form}>
                <Button color="orange" title="Login Using Facebook" onPress={() => logInUsingFacebookApi()/*navigation.navigate("Login")*/}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        flex: 3,
        width: "100%",
        resizeMode: "contain",
        alignSelf: "center"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    },
    button: {
        backgroundColor: '#68a0cf',
        overflow: 'hidden',
    },
    textContainer: {
        alignItems: "center",
    },
    titleText: {
        fontSize: 30
    },
    introText: {
        fontSize: 12
    }
});

export default LoginScreen;



