import * as Facebook from "expo-facebook";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { addUser } from "../SmatchServerAPI";

async function initializeFacebookApi() {
  await Facebook.initializeAsync({
    appId: Constants.manifest.facebookAppId,  // Declared in app.json
  });
}

export async function runLoginScheme(updateAuthLogIn, setCurrentUserData) {
  /* This function will run the following login scheme:
   * 1. Authenticate using facebook-login
   * 2. Send request to SmatchServer API to check if user exist, if not - register it.
   * 3. Update redux credentials, which will automatically re-render the main app screen.
   * */

  // 1.1 Login & get FB token
  const { token } = await logInUsingFacebookApi();

  if (!token) {
    console.log("Error: no token returned from fb-login");
    return;
  }

  // 1.2 Get FB user-id (& other metadata) using the token
  const response = await fetch(`https://graph.facebook.com/me?
                                fields=id,name,gender,birthday,picture.width(300).height(300)
                                &access_token=${token}`);
  const res = await response.json();

  const { id, name, gender, birthday, picture } = res

  // 2. SmatchServer: check if user is registered, register it if not
  await addUser(id, name, calculateAge(birthday), gender, picture.data.url);

  // 3.1 Update current user account data in redux store
  setCurrentUserData(token, id, name, calculateAge(birthday), gender, picture.data.url);

  // 3.2 Update redux auth, and rerender main screen
  updateAuthLogIn(id);
}

function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const difference = Date.now() - birthDate.getTime();
  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}

async function logInUsingFacebookApi() {
  try {
    await initializeFacebookApi();
    const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'user_gender', 'user_birthday'],
    });
    return {
      token: (type === 'success') ? token : null
    };
  } catch (props) {
    Alert.alert(`Facebook Login Error: ${props.message}`);
    return { token: null };
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
