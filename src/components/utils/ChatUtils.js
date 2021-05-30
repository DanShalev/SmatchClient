function generateGiftedChatMessage(loggedUserId, otherUserId, otherUserPic, text, sender, date) {
  return {
    _id: date ? date : Math.random() * 1000000000,
    text: text,
    createdAt: new Date(),
    user: {
      _id: sender ? loggedUserId : otherUserId,
      avatar: sender ? null : ((otherUserPic != null && otherUserPic.length > 0) ? otherUserPic[0] : null),
    }
  };
}

export function generateSenderChatMessage(loggedUserId, text, date=null) {
  return generateGiftedChatMessage(loggedUserId, null, null, text, true, date);
}

export function generateReceiverChatMessage(loggedUserId, otherUserId, otherUserPic, text, date=null) {
  return generateGiftedChatMessage(loggedUserId, otherUserId, otherUserPic, text, false, date);
}
