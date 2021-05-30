import React, {useEffect, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat";
import { generateQuote } from "../../mocks/ConversationMock";
import {renderCustomBubble} from "../components/CustomBubble";
import { initMessages, sendMessage } from "../api/SmatchServerAPI";
import {connect} from "react-redux";
import { addMessage } from "../redux/actions/actionCreators";
import { generateReceiverChatMessage, generateSenderChatMessage } from "../components/utils/ChatUtils";

function ConversationScreen(props) {
  const {groupId, otherUser, loggedUserId, addMessage, messagesMapping} = props;
  const [isTyping, setIsTyping] = useState(false);

  const messages = preprocessMessages(loggedUserId, otherUser, groupId, messagesMapping);

  useEffect(() => {
    initMessages(loggedUserId, groupId, otherUser, addMessage);
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
  groupId: state.mainReducer.conversation.currentConversationId.group,
  otherUser: state.mainReducer.conversation.currentConversationId.user,
  messagesMapping: state.mainReducer.conversation.conversationsMapByGroupAndUser,
});
const mapDispatchToProps = {addMessage};
export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);

async function onMessageSend(newMessages, addMessage, setIsTyping, groupId, otherUser, loggedUserId) {
  // Append User Message
  const message = newMessages[0].text;
  const senderMsg = generateSenderChatMessage(loggedUserId, message);
  addMessage(groupId, otherUser.id, [senderMsg]);
  sendMessage(groupId, otherUser.id, loggedUserId, message);

  // Generate Bot Response
  setIsTyping(true);
  const response = generateQuote();
  const timeout = response.length * 25; // Calculates time a person would take to type: #letter * 20 MiliSec per one letter typing
  await setTimeout(() => {
    setIsTyping(false);
    const receiverMsg = generateReceiverChatMessage(loggedUserId, otherUser.id, otherUser.pictures, response);
    addMessage(groupId, otherUser.id, [receiverMsg]);
  }, timeout);
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
