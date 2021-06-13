import * as Facebook from "expo-facebook";
import { Alert } from "react-native";
import Constants from "expo-constants";

export async function logInUsingFacebookApi(updateAuthLogIn) {
  try {
    await Facebook.initializeAsync({
      appId: Constants.manifest.facebookAppId,  // Declared in app.json
    });
    const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') { // If user pressed on "login" rather then "cancel" (type==='cancel')
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      console.log(await response.json())
      updateAuthLogIn();
    }
  } catch (props) {
    Alert.alert(`Facebook Login Error: ${props.message}`);
  }
}

// TODO use facebook authenticate credentials to see if user needs to log in
// TODO add log out
// TODO check on loading if user need to reauthenticate or not
