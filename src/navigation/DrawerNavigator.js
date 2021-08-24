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
import {logoutUsingFacebookApi} from "../api/facebook-login/facebookLoginUtils";
import JoinGroupScreen from "../screens/JoinGroupScreen";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/authSlice";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator {...setDrawerNavBarProperties()} drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreenStackNavigator} {...disableDrawerNavBar()} />
        <Drawer.Screen name="Account" component={PersonalAccountScreen} {...setAccountScreenHeaders()} />
        <Drawer.Screen name="Create Group" component={CreateGroupScreen} {...setCreateGroupScreenHeaders()} />
        <Drawer.Screen name="About" component={AboutScreen} {...setAboutScreenHeaders()} />
        <Drawer.Screen name="GroupDetails" component={JoinGroupScreen} {...setAboutScreenHeaders()} />
      </Drawer.Navigator>
  );
}

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

  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...filteredProps}>
      <DrawerItemList {...filteredProps} />
      <DrawerItem label="Log Out" onPress={() => {
        dispatch(logOut());
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
