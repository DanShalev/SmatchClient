import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { setDrawerNavBarProperties } from "./utils/NavBarProperties";
import { CreateGroupScreen } from "../screens/CreateGroupScreen";
import { HomeScreenStackNavigator } from "./StackNavigator";
import {
  setCreateGroupScreenHeaders,
  setSettingsScreenHeaders,
  setAccountScreenHeaders,
  setAboutScreenHeaders,
} from "./utils/ScreensHeaders";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import PersonalAccountScreen from "../screens/PersonalAccountScreen";
import { setLoggedOutCredentials } from "../redux/actions/actionCreators";
import { connect } from "react-redux";
import { logoutUsingFacebookApi } from "../api/facebook-login/facebookLoginUtils";

const Drawer = createDrawerNavigator();

export function DrawerNavigator({ setLoggedOutCredentials }) {
  return (
      <Drawer.Navigator {...setDrawerNavBarProperties()} drawerContent={props => <CustomDrawerContent {...props} logout={setLoggedOutCredentials} />}>
        <Drawer.Screen name="Home" component={HomeScreenStackNavigator} {...disableDrawerNavBar()} />
        <Drawer.Screen name="Create Group" component={CreateGroupScreen} {...setCreateGroupScreenHeaders()} />
        <Drawer.Screen name="Settings" component={SettingsScreen} {...setSettingsScreenHeaders()} />
        <Drawer.Screen name="About" component={AboutScreen} {...setAboutScreenHeaders()} />
        <Drawer.Screen name="Account" component={PersonalAccountScreen} {...setAccountScreenHeaders()} />
      </Drawer.Navigator>
  );
}

const mapDispatchToProps = {
  setLoggedOutCredentials
};
export default connect(null, mapDispatchToProps)(DrawerNavigator);

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={() => {
        props.logout();
        logoutUsingFacebookApi();
      }} />
    </DrawerContentScrollView>
  );
}

function disableDrawerNavBar() {
  return {
    options: {
      headerShown: false,
    },
  };
}
