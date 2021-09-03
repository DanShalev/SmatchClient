function generateGiftedChatMessage(loggedUserId, otherUserId, otherUserPic, message, sender, messageId) {
  return {
    _id: messageId ? messageId : Math.floor(Math.random() * 100000000000),
    text: message,
    createdAt: new Date(),
    user: {
      _id: sender ? loggedUserId : otherUserId,
      avatar: sender ? null : ((otherUserPic != null && otherUserPic.length > 0) ? otherUserPic[0] : null),
    }
  };
}

export function generateSenderChatMessage(loggedUserId, message) {
  return generateGiftedChatMessage(loggedUserId, null, null, message, true, null);
}

export function generateReceiverChatMessage(loggedUserId, otherUserId, otherUserPic, message, messageId) {
  return generateGiftedChatMessage(loggedUserId, otherUserId, otherUserPic, message, false, messageId);
}
