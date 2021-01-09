import React, {useEffect, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat";
import {conversationText, generateResponse} from "../../mocks/ConversationMock";
import {renderCustomBubble} from "./utils/CustomBubble";

export default function ConversationScreen() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages(conversationText);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onMessageSend(newMessages, setMessages, setIsTyping)}
      user={{_id: 1}}
      showAvatarForEveryMessage
      renderBubble={renderCustomBubble}
      isTyping={isTyping}
    />
  );
}

async function onMessageSend(newMessages = [], setMessages, setIsTyping) {
  // Append User Message
  setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

  // Generate Bot Response
  setIsTyping(true);
  const response = generateResponse();
  const timeout = response.text.length * 25; // Calculates time a person would take to type: #letter * 20 MiliSec per one letter typing
  await setTimeout(() => {
    setIsTyping(false);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, [response]));
  }, timeout);
}
