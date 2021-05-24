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
      headerRight: () => <BackArrowHeader navigateLocation={"Matches"} />,
    },
  };
}

export function setSmatchAccountScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader />,
      headerRight: () => <BackArrowHeader navigateLocation={"Profiles"} />,
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

export function setAccountScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader title="Account" />,
      headerRight: () => <BackArrowHeader navigateLocation={"Groups"} />,
    },
  };
}
export function setAboutScreenHeaders() {
  return {
    options: {
      headerLeft: () => <SmatchLogoHeader title="About" />,
      headerRight: () => <BackArrowHeader navigateLocation={"Groups"} />,
    },
  };
}
