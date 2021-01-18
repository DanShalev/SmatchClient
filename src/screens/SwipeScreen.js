import * as React from "react";
import Profiles from "../components/swipe/Profiles";

export default function SwipeScreen({ route }) {
  return <Profiles profilesProp={[...route.params.profiles]} />;
}
