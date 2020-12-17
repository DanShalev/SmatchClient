import * as React from "react";
import SwipeScreenMocks from "../../mocks/SwipeMocks.js";
import Profiles from "../components/swipe/Profiles";

export default function SwipeScreen() {
  return (
      <Profiles profilesProp={[...SwipeScreenMocks]}/>
  );
}