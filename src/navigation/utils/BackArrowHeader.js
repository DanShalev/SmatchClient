import * as React from "react";
import { Platform, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {  updateCurrentConversationId } from "../../redux/slices/conversationSlice";
import { selectCurrentGroupId } from "../../redux/slices/groupsSlice";

export default function BackArrowHeader({ navigateLocation }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentGroupId = useSelector(selectCurrentGroupId);

  return (
    <SafeAreaView style={styles.backArrow}>
      <TouchableOpacity onPress={() =>{
        /*
        * CurrentConversation is updated only when user is on a certain conversation screen.
        * on any other screen, CurrentConversation is null
        * */
        if (navigateLocation === "Matches") {
          dispatch(updateCurrentConversationId({user: null, groupId: currentGroupId}))
          navigation.navigate("Home", { screen: "SwipeScreen", params: { screen: "Matches" }});
        } else {
          navigation.navigate(navigateLocation)
        }
      }}>
        <Ionicons name={"ios-arrow-back"} color={colors.tertiary} size={Platform === "android" ? 35 : 30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    alignItems: "center",
    paddingTop: Platform === "android" ? 0 : -5,
    paddingRight: 15,
  },
});
