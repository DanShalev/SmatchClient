import React, { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { deleteMessageInServer, registerForPushNotifications } from "../api/SmatchServerAPI";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToGroupMessageBadge, selectCurrentGroupId } from "../redux/slices/groupsSlice";
import { selectUserFacebookId } from "../redux/slices/authSlice";
import { addToMatchMessageBadge, selectMatches } from "../redux/slices/matchesSlice";
import { selectCurrentConversation, updateCurrentConversationId } from "../redux/slices/conversationSlice";
import {
  findUserProfile,
  isInConversationScreen,
  isTypeChat, saveMessage,
  shouldShowNotification
} from "./NotificationUtil";
import { updateMatchAndGroupBadges } from "../screens/utils/ScreenUtils";

export default function useNotifications() {
  const dispatch = useDispatch();
  const loggedUserId = useSelector(selectUserFacebookId);
  const currentGroupId = useSelector(selectCurrentGroupId);
  const matches = useSelector(selectMatches);
  const currentConversation = useSelector(selectCurrentConversation);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();


  useEffect(() => {
    registerForPushNotification();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      const {
        messageId: messageId,
        groupId: groupId,
        otherUserId: otherUserId,
        message: message,
        type: type
      } = notification.request.content.data;
      if (isTypeChat(type)) {
        if (isInConversationScreen(currentConversation.user, otherUserId)) {
          shouldShowNotification(false);
        } else {
          shouldShowNotification(true);
          dispatch(addToGroupMessageBadge({ groupId }));
          dispatch(addToMatchMessageBadge({ otherUserId, groupId }));
        }
        saveMessage(groupId, otherUserId, loggedUserId, message, messageId, dispatch, matches);
        deleteMessageInServer(loggedUserId, messageId);
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const otherUserId = response.notification.request.content.data.otherUserId;
      const groupId = response.notification.request.content.data.groupId;
      const profile = findUserProfile(matches, groupId, otherUserId);
      dispatch(updateCurrentConversationId({ user: profile, group: groupId }));
      updateMatchAndGroupBadges(profile.id, currentGroupId, matches, dispatch);
      navigation.navigate("ConversationScreen");
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [currentConversation]);


  const registerForPushNotification = async () => {
    try {
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      await registerForPushNotifications(loggedUserId, token);
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX
        });
      }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
}