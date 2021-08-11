import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { generateQuote } from "../../mocks/ConversationMock";
import { renderCustomBubble } from "../components/CustomBubble";
import { getTypingStatus, initMessages, sendMessage, setTypingStatus } from "../api/SmatchServerAPI";
import { connect } from "react-redux";
import {
  addMessage,
  updateCurrentConversationIsTyping
} from "../redux/actions/actionCreators";
import { generateReceiverChatMessage, generateSenderChatMessage } from "../components/utils/ChatUtils";

function ConversationScreen(props) {
  const { groupId, otherUser, loggedUserId, addMessage, messagesMapping, isTyping, updateCurrentConversationIsTyping } = props;

  const messages = preprocessMessages(loggedUserId, otherUser, groupId, messagesMapping);
  const [prevText, setPrevText] = useState("");

  useEffect(() => {
    initMessages(loggedUserId, groupId, otherUser.id, addMessage);
  }, []);

  const updateTypingStatus = async () => {
    let isTyping = await getTypingStatus(groupId, loggedUserId, otherUser.id);
    updateCurrentConversationIsTyping(isTyping);
  };

  useEffect(() => {
    updateTypingStatus();
    const interval = setInterval(updateTypingStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GiftedChat
      messages={messages.slice().reverse()}
      onSend={(newMessages) => onMessageSend(newMessages, addMessage, groupId, otherUser, loggedUserId)}
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

const mapStateToProps = (state) => ({
  loggedUserId: state.authentication.authCredentials.facebook_id,
  groupId: state.mainReducer.conversation.currentConversation.group,
  otherUser: state.mainReducer.conversation.currentConversation.user,
  messagesMapping: state.mainReducer.conversation.conversationsMapByGroupAndUser,
  isTyping: state.mainReducer.conversation.currentConversation.isTyping,
});
const mapDispatchToProps = { addMessage, updateCurrentConversationIsTyping };
export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);

async function generateBotResponse(loggedUserId, otherUser, addMessage, groupId) {
  const response = generateQuote();
  const timeout = response.length * 25; // Calculates time a person would take to type: #letter * 20 MiliSec per one letter typing
  await setTimeout(() => {
    const receiverMsg = generateReceiverChatMessage(loggedUserId, otherUser.id, otherUser.pictures, response);
    addMessage(groupId, otherUser.id, [receiverMsg], false);
  }, timeout);
}

function appendUserMessage(newMessages, loggedUserId, addMessage, groupId, otherUser) {
  const message = newMessages[0].text;
  const senderMsg = generateSenderChatMessage(loggedUserId, message);
  addMessage(groupId, otherUser.id, [senderMsg], true);
  sendMessage(groupId, otherUser.id, loggedUserId, message);
}

async function onMessageSend(newMessages, addMessage, groupId, otherUser, loggedUserId) {
  appendUserMessage(newMessages, loggedUserId, addMessage, groupId, otherUser);
  // await generateBotResponse(loggedUserId, otherUser, addMessage, groupId);
}

function preprocessMessages(loggedUserId, otherUser, groupId, messagesMapping) {
  const messagesExist = groupId in messagesMapping && otherUser.id in messagesMapping[groupId];
  if (!messagesExist) {
    return [];
  }

  let messages = messagesMapping[groupId][otherUser.id];

  // Iterate messages and add matches user photo to each message
  for (let message of messages) {
    if (message.user._id === loggedUserId) {
      continue;
    }

    message.user.avatar = otherUser.pictures.length > 0 ? otherUser.pictures[0] : null;
  }

  return messages;
}
