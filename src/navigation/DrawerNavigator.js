import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {setDrawerNavBarProperties} from "./utils/NavBarProperties";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import {HomeScreenStackNavigator} from "./StackNavigator";
import {
  setCreateGroupScreenHeaders,
  setAccountScreenHeaders,
  setAboutScreenHeaders,
} from "./utils/ScreensHeaders";
import AboutScreen from "../screens/AboutScreen";
import PersonalAccountScreen from "../screens/PersonalAccountScreen";
import { setLoggedOutCredentials } from "../redux/actions/actionCreators";
import { connect } from "react-redux";
import {logoutUsingFacebookApi} from "../api/facebook-login/facebookLoginUtils";
import JoinGroupScreen from "../screens/JoinGroupScreen";

const Drawer = createDrawerNavigator();

export function DrawerNavigator({ setLoggedOutCredentials }) {
  return (
      <Drawer.Navigator {...setDrawerNavBarProperties()} drawerContent={props => <CustomDrawerContent {...props} logout={setLoggedOutCredentials} />}>
        <Drawer.Screen name="Home" component={HomeScreenStackNavigator} {...disableDrawerNavBar()} />
        <Drawer.Screen name="Account" component={PersonalAccountScreen} {...setAccountScreenHeaders()} />
        <Drawer.Screen name="Create Group" component={CreateGroupScreen} {...setCreateGroupScreenHeaders()} />
        <Drawer.Screen name="About" component={AboutScreen} {...setAboutScreenHeaders()} />
        <Drawer.Screen name="GroupDetails" component={JoinGroupScreen} {...setAboutScreenHeaders()} />
      </Drawer.Navigator>
  );
}

const mapDispatchToProps = {
  setLoggedOutCredentials
};
export default connect(null, mapDispatchToProps)(DrawerNavigator);

function CustomDrawerContent(props) {
  const screenName = "GroupDetails"
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(routeName => {
        routeName !== screenName;
      }),
      routes: props.state.routes.filter(route => route.name !== screenName),
    },
  };

  return (
    <DrawerContentScrollView {...filteredProps}>
      <DrawerItemList {...filteredProps} />
      <DrawerItem label="Log Out" onPress={() => {
        filteredProps.logout();
        logoutUsingFacebookApi();
      }}/>
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
