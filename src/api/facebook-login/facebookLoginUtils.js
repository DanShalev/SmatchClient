import * as Facebook from "expo-facebook";

export async function logInUsingFacebookApi() {
  //try {
    await Facebook.initializeAsync({
      appId: '215513540382038',
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    console.log("here")
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  /*} catch (props) {
    console.log(props)
    alert(`Facebook Login Error: ${props.message}`);
  }*/
}
