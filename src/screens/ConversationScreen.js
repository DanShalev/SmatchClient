import React, {useEffect, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat";
import { generateQuote } from "../../mocks/ConversationMock";
import {renderCustomBubble} from "../components/CustomBubble";
import { initMessages } from "../api/SmatchServerAPI";
import {connect} from "react-redux";
import { addMessage } from "../redux/actions/actionCreators";

function ConversationScreen(props) {
  const {groupId, otherUser, loggedUserId, addMessage, messagesMapping} = props;
  const [isTyping, setIsTyping] = useState(false);

  const messagesExist = groupId in messagesMapping && otherUser.id in messagesMapping[groupId];
  const messages = messagesExist ? messagesMapping[groupId][otherUser.id] : [];

  useEffect(() => {
    initMessages(loggedUserId, groupId, otherUser, addMessage, generateGiftedChatMessage);
  }, []);

  return (
    <GiftedChat
      messages={messages.slice().reverse()}
      onSend={(newMessages) => onMessageSend(newMessages, addMessage, setIsTyping, groupId, otherUser, loggedUserId)}
      user={{_id: loggedUserId}}
      showAvatarForEveryMessage
      renderBubble={renderCustomBubble}
      isTyping={isTyping}
    />
  );
}

const mapStateToProps = (state) => ({
  loggedUserId: state.authentication.id,
  groupId: state.conversations.currentConversationId.group,
  otherUser: state.conversations.currentConversationId.user,
  messagesMapping: state.conversations.groups,
});
const mapDispatchToProps = {addMessage};
export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);

async function onMessageSend(newMessages, addMessage, setIsTyping, groupId, otherUser, loggedUserId) {
  // Append User Message
  const senderMsg = generateGiftedChatMessage(loggedUserId, otherUser, newMessages[0].text, true);
  addMessage(groupId, otherUser.id, [senderMsg]);

  // Generate Bot Response
  setIsTyping(true);
  const response = generateQuote();
  const timeout = response.length * 25; // Calculates time a person would take to type: #letter * 20 MiliSec per one letter typing
  await setTimeout(() => {
    setIsTyping(false);
    const receiverMsg = generateGiftedChatMessage(loggedUserId, otherUser, response, false);
    addMessage(groupId, otherUser.id, [receiverMsg]);
  }, timeout);
}

export function generateGiftedChatMessage(loggedUserId, otherUser, text, sender) {
  return {
    _id: Math.random() * 1000000000,
    text: text,
    createdAt: new Date(),
    user: {
      _id: sender ? loggedUserId : otherUser.id,
      avatar: sender ? null : (otherUser.pictures.length > 0 ? otherUser.pictures[0] : null),
    }
  };
}
