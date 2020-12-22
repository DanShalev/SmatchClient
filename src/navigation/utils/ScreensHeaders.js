import SmatchLogoHeader from "./SmatchLogoHeader";
import SideMenuHeader from "./SideMenuHeader";
import BackArrowHeader from "./BackArrowHeader";
import React from "react";

export function setHomeScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <SideMenuHeader />,
    },
  };
}

export function setSwipeScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <BackArrowHeader navigateLocation={"Groups"} />,
    },
  };
}

export function setConversationScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <BackArrowHeader navigateLocation={"Swipe"} />,
    },
  };
}

export function setCreateGroupScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <BackArrowHeader navigateLocation={"Groups"} />,
    },
  };
}

export function setSettingsScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <BackArrowHeader navigateLocation={"Groups"} />,
    },
  };
}
