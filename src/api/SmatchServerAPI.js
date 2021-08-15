import smatchServer from "./SmatchServer";
import {generateReceiverChatMessage} from "../components/utils/ChatUtils";
import {cacheGroupsImages, cacheProfilesImages, cacheUserImages} from "./utils/Utils";

export function printErrorDetails(error, url) {
  if (error.response) {
    // Request made and server responded
    console.log("Server responded with error while calling: ", url);
    console.log(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.log("No response from server while calling: ", url);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error: ", error.message);
  }
}

const header = (userId) => {
  return {
    headers: {
      userId: userId,
      "Content-Type": "application/json",
    },
  };
};

export function updateGroupsProfilesAndMatches(userId, updateGroups, updateProfiles, updateMatches, addMessage) {
  getAndUpdateGroups(userId, updateGroups);
  getAndUpdateProfiles(userId, updateProfiles);
  getAndUpdateMatches(userId, updateMatches);
  getAndUpdateConversations(userId, addMessage);
}

export function getAndUpdateGroups(userId, updateGroups) {
  const url = `/subscription/user`;
  try {
    smatchServer.get(url, header(userId)).then((result) => cacheGroupsImages(result.data))
      .then((result) => updateGroups(result));
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export async function getGroupById(groupId, userId) {
  const url = `/group/${groupId}`;
  try {
    return await smatchServer.get(url, header(userId))
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export function getAndUpdateProfiles(userId, updateProfiles) {
  const url = `/group/profiles`;
  try {
    smatchServer.get(url, header(userId)).then((result) => cacheProfilesImages(result.data))
      .then((result) => updateProfiles(result));
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export function getAndUpdateMatches(userId, updateMatches) {
  const url = `/group/matches`;
  try {
    smatchServer.get(url, header(userId)).then((result) => cacheProfilesImages(result.data))
      .then((result) => updateMatches(result));
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export async function getAndUpdateConversations(userId, addMessage) {
  const url = `/chat/get`;
  try {
    const response = await smatchServer.get(url, header(userId));
    for (const [groupId, groupData] of Object.entries(response.data)) {
      for (const [otherUserId, messageArray] of Object.entries(groupData)) {
        for (const messageData of messageArray) {
          const receiverMsg = generateReceiverChatMessage(userId, messageArray, null, messageData.message);
          addMessage(groupId, otherUserId, [receiverMsg], false);
        }
      }
    }
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export async function createGroup(group) {
  const url = `/group/create`;
  try {
    return await smatchServer.post(url, group, header(group.userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function removeUserFromGroup(groupId, userId) {
  const url = `/subscription/delete/${groupId}`;
  try {
    return await smatchServer.delete(url, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function addUserToGroup(groupId, userId) {
  const url = `/subscription/add/${groupId}`;
  try {
    return await smatchServer.post(url, null, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function insertLike(groupId, userId, otherUserId) {
  const url = `/match/like/${groupId}/${otherUserId}`;
  try {
    return await smatchServer.post(url, null, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function insertDislike(groupId, userId, otherUserId) {
  const url = `/match/dislike/${groupId}/${otherUserId}`;
  try {
    return await smatchServer.post(url, null, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function unmatch(groupId, userId, otherUserId) {
  const url = `/match/update/${groupId}/${otherUserId}`;
  try {
    return await smatchServer.put(url, null, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function unmatchAllGroupUsers(groupId, userId) {
  const url = `/match/update/${groupId}`;
  try {
    return await smatchServer.put(url, null, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function initMessages(userId, groupId, otherUserId, addMessage) {
  const url = `/chat/get/${groupId}/${otherUserId}`;
  try {
    await smatchServer.get(url, header(userId)).then((result) => {
      const messages = result.data;

      for (let message of messages) {
        const msg = generateReceiverChatMessage(userId, otherUserId, null, message.message);
        addMessage(groupId, otherUserId, [msg]);
      }
    });
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function sendMessage(groupId, otherUser, loggedUserId, message) {
  const url = `/chat/send`;
  try {
    return await smatchServer.post(url, {
      content: message,
      groupId: groupId,
      receiverId: otherUser,
      senderId: loggedUserId,
    });
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function registerForPushNotifications(userId, token) {
  const url = `/user/registerUserForPushNotifications`;
  try {
    return await smatchServer.post(url, { token: token.data }, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function sendPushNotifications(userId) {
  const url = `/user/push`;
  try {
    return await smatchServer.post(url, null, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function getUserFieldsFromBE(userId, groupId, setFields) {
  const url = `/group/fields/${groupId}`;
  try {
    let result = await smatchServer.get(url, header(userId));
    setFields(result.data);
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function addUser(id, name, age, gender, picture) {
  const url = `/user/add`;
  try {
    let res = await smatchServer.post(url, {
      age: age,
      id: id,
      image1: picture,
      image2: null,
      image3: null,
      name: name,
      pushNotificationToken: null,
      sex: gender
    });
    return res.data;
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function getAllGroups(setGroups, setResults) {
  const url = `/group/get`;
  try {
    const results = await smatchServer.get(url);
    setGroups(results.data);
    setResults(results.data);
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function updateUserImage(userId, imageNum, image) {
  const url = `/user/setUserImage/${imageNum}`;
  try {
    return await smatchServer.post(url, image, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function removeUserImage(userId, imageNum) {
  const url = `/user/removeUserImage/${imageNum}`;
  try {
    return await smatchServer.get(url, header(userId));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function getUserMetadata(userId) {
  const url = `/user/getUser`;
  try {
    let res = await smatchServer.get(url, header(userId));
    return await cacheUserImages(res.data)
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function getTypingStatus(groupId, userId, otherUserId) {
  const url = `/chat/getTypingStatus/${groupId}/${otherUserId}`;
  try {
    let res =  await smatchServer.get(url, header(userId));
    return res.data;
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function setTypingStatus(groupId, userId, otherUserId, typingStatus) {
  const url = `/chat/setTypingStatus/${groupId}/${otherUserId}`;
  try {
    let res =  await smatchServer.post(url, typingStatus ? "true" : "false", header(userId));
    return res.data;
  } catch (error) {
    printErrorDetails(error, url);
  }
}
