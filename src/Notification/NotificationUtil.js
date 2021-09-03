import * as Notifications from "expo-notifications";
import { generateReceiverChatMessage } from "../components/utils/ChatUtils";
import { addMessage } from "../redux/slices/conversationSlice";


export function shouldShowNotification(shouldShow) {
  return (
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: shouldShow,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })
  );
}

export function saveMessage(groupId, otherUserId, loggedUserId, message, messageId, dispatch, matches) {
  const profile = findUserProfile(matches, groupId, otherUserId);
  let myMessage = generateReceiverChatMessage(loggedUserId, otherUserId, profile.avatar, message, messageId);
  dispatch(addMessage({
    groupId: groupId,
    otherUserId: otherUserId,
    message: [myMessage]
  }));
}

export function findUserProfile(matches, groupId, otherUserId) {
  return matches[groupId].find((match) => match.id === otherUserId);
}

export function isTypeChat(type) {
  return type === "chat";
}


export function isInConversationScreen(user, otherUserId) {
  return user !== null && user.id === otherUserId;
}