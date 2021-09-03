import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { renderCustomBubble } from "../components/CustomBubble";
import { getTypingStatus, sendMessage, setTypingStatus } from "../api/SmatchServerAPI";
import { useDispatch, useSelector } from "react-redux";
import { generateSenderChatMessage } from "../components/utils/ChatUtils";
import { selectUserFacebookId } from "../redux/slices/authSlice";
import {
  addMessage,
  selectConversationMapping,
  selectCurrentConversation,
  updateCurrentConversationIsTyping
} from "../redux/slices/conversationSlice";

export default function ConversationScreen() {
  const loggedUserId = useSelector(selectUserFacebookId);
  const messagesMapping = useSelector(selectConversationMapping);
  const {group: groupId, user: otherUser, isTyping: isTyping } = useSelector(selectCurrentConversation);
  const dispatch = useDispatch();

  const messages = preprocessMessages(loggedUserId, otherUser, groupId, messagesMapping);
  const [prevText, setPrevText] = useState("");

  const updateTypingStatus = async () => {
    let isTyping = await getTypingStatus(groupId, loggedUserId, otherUser.id);
    dispatch(updateCurrentConversationIsTyping({isTyping}));
  };

  useEffect(() => {
    updateTypingStatus();
    const interval = setInterval(updateTypingStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GiftedChat
      messages={messages.slice().reverse()}
      onSend={(newMessages) => appendMessage(newMessages, loggedUserId, dispatch, groupId, otherUser.id)}
      user={{ _id: loggedUserId }}
      showAvatarForEveryMessage
      renderBubble={renderCustomBubble}
      isTyping={isTyping}
      onInputTextChanged={(text) => {
        let startTyping = !prevText && text;
        let finishTyping = !text && prevText;
        if (startTyping) {
          setTypingStatus(groupId, loggedUserId, otherUser.id, true);
        } else if (finishTyping) {
          setTypingStatus(groupId, loggedUserId, otherUser.id, false);
        }
        setPrevText(text);
      }}
    />
  );
}

// async function generateBotResponse(loggedUserId, otherUser, dispatch, groupId) {
//   const response = generateQuote();
//   const timeout = response.length * 25; // Calculates time a person would take to type: #letter * 20 MiliSec per one letter typing
//   await setTimeout(() => {
//     const receiverMsg = generateReceiverChatMessage(loggedUserId, otherUser.id, otherUser.pictures, response);
//     dispatch(addMessage({
//       groupId: groupId,
//       otherUserId: otherUser.id,
//       message: [receiverMsg]
//     }));
//   }, timeout);
// }

function appendMessage(newMessages, loggedUserId, dispatch, groupId, otherUserId) {
  const message = newMessages[0].text;
  const senderMsg = generateSenderChatMessage(loggedUserId, message);
  dispatch(addMessage({
    groupId: groupId,
    otherUserId: otherUserId,
    message: [senderMsg]
  }));
  sendMessage(groupId, otherUserId, loggedUserId, message)
}

function preprocessMessages(loggedUserId, otherUser, groupId, messagesMapping) {
  const messagesExist = groupId in messagesMapping && otherUser.id in messagesMapping[groupId];
  if (!messagesExist) {
    return [];
  }
  let deepCopyMessages = JSON.parse(JSON.stringify(messagesMapping)); //deep copy is required because messageMapping is immutable
  let messages = deepCopyMessages[groupId][otherUser.id];
  // Iterate messages and add matches user photo to each message
  for (let message of messages) {
    if (message.user._id === loggedUserId) {
      continue;
    }
    message.user.avatar = otherUser.pictures.length > 0 ? otherUser.pictures[0] : null;
  }
  return messages;
}
