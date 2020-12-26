import {Bubble} from "react-native-gifted-chat";
import colors from "../../config/colors";
import React from "react";

export function renderCustomBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: colors.textBubbleBackgroundColor,
        },
      }}
    />
  );
}