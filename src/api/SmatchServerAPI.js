import smatchServer from "./SmatchServer";
import { generateReceiverChatMessage } from "../components/utils/ChatUtils";

function printErrorDetails(error, url) {
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
    }
  }
}

export function updateGroupsProfilesAndMatches(userId, updateGroups, updateProfiles, updateMatches, addMessage) {
  getAndUpdateGroups(userId, updateGroups);
  getAndUpdateProfiles(userId, updateProfiles);
  getAndUpdateMatches(userId, updateMatches);
  getAndUpdateConversations(userId, addMessage);
}

export function getAndUpdateGroups(userId, updateGroups) {
  const url = `/subscription/user/${userId}`;
  try {
    smatchServer.get(url).then(result => updateGroups(result.data))
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export function getAndUpdateProfiles(userId, updateProfiles) {
  const url = `/group/profiles/${userId}`;
  try {
    smatchServer.get(url).then(result => {updateProfiles(result.data)});
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export function getAndUpdateMatches(userId, updateMatches) {
  const url = `/group/matches/${userId}`;
  try {
    smatchServer.get(url).then(result => {updateMatches(result.data)});
  } catch (error) {
    printErrorDetails(error, url);
    return null;
  }
}

export async function getAndUpdateConversations(userId, addMessage) {
  const url = `/chat/get/${userId}`;
  try {
    const response = await smatchServer.get(url);
    for (const [groupId, groupData] of Object.entries(response.data)) {
      for (const [otherUserId, messageArray] of Object.entries(groupData)) {
        for (const messageData of messageArray) {
          const receiverMsg = generateReceiverChatMessage(loggedUserId, otherUser, null, message.message);
          addMessage(groupId, otherUserId, [receiverMsg]);
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
    return await smatchServer.post(url, group, header(group.auth));
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function removeFromGroup(groupId, userId) {
  const url = `/subscription/delete/${groupId}/${userId}`;
  try {
    return await smatchServer.delete(url);
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function insertLike(groupId, userId, otherUserId) {
  const url = `/match/like/${groupId}/${userId}/${otherUserId}`;
  try {
    return await smatchServer.post(url);
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function insertDislike(groupId, userId, otherUserId) {
  const url = `/match/dislike/${groupId}/${userId}/${otherUserId}`;
  try {
    return await smatchServer.post(url);
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

export function initMessages(loggedUserId, groupId, otherUser, addMessage) {
  // TODO add server fetching of specific conversation here
  // const messages = [
  //   // {message: "Hey", sender: true},
  //   // {message: "Hey you!", sender: false},
  // ];
  // for (let message of messages) {
  //   const msg = generateReceiverChatMessage(loggedUserId, otherUser, null, message.message);
  //   addMessage(groupId, otherUser.id, [msg]);
  // }
}

export async function sendMessage(groupId, otherUser, loggedUserId, message) {
  const url = `/chat/send`;
  try {
    return await smatchServer.post(url, {
      content: message,
      groupId: groupId,
      receiverId: otherUser,
      senderId: loggedUserId
    });
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function registerForPushNotifications(userId, token) {
  const url = `/user/registerUserForPushNotifications/${userId}`;
  try {
    return await smatchServer.post(url, { token: token.data });
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function sendPushNotifications(userId) {
  const url = `/user/push/${userId}`;
  try {
    return await smatchServer.post(url);
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function getUserFieldsFromBE(userId, groupId, setFields) {
  const url = `/group/fields/${groupId}/${userId}`;
  try {
    let result = await smatchServer.get(url);
    setFields(result.data);
  } catch (error) {
    printErrorDetails(error, url);
  }
}

export async function addUser(id, name, age, gender, picture) {
  const url = `/user/add`;
  try {
    return await smatchServer.post(url, {
      age: age,
      id: id,
      image1: picture,
      image2: null,
      image3: null,
      name: name,
      pushNotificationToken: null,
      sex: gender
    });
  } catch (error) {
    printErrorDetails(error, url);
  }
}
