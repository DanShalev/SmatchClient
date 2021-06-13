import * as Facebook from "expo-facebook";
import { Alert } from "react-native";
import Constants from "expo-constants";

async function initializeFacebookApi() {
  await Facebook.initializeAsync({
    appId: Constants.manifest.facebookAppId,  // Declared in app.json
  });
}

export async function logInUsingFacebookApi(updateAuthLogIn) {
  try {
    await initializeFacebookApi();
    const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') { // If user pressed on "login" rather then "cancel" (type==='cancel')
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const { id, name } = await response.json();
      console.log("response...", id, name)
      // Fixme Add registerIfNotExist()
      updateAuthLogIn(id);
    }
  } catch (props) {
    Alert.alert(`Facebook Login Error: ${props.message}`);
  }
}

export async function logoutUsingFacebookApi() {
  try {
    await initializeFacebookApi();
    await Facebook.logOutAsync();
  } catch (props) {
    Alert.alert(`Facebook Logout Error: ${props.message}`);
  }
}

async function isUserAuthenticated() {
  await initializeFacebookApi();
  return await Facebook.getAuthenticationCredentialAsync();
}


export async function validateFacebookAuthentication(logout) {
  // This function will logout if user is not authenticate. It is used to verify stored login token is up to date
  let auth = await isUserAuthenticated();

  if (!auth) {
    logout();
  }
}
