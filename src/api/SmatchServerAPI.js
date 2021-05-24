import smatchServer from "./SmatchServer";

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

export function updateGroupsProfilesAndMatches(userId, updateGroups, updateProfiles, updateMatches){
  getAndUpdateGroups(userId, updateGroups);
  getAndUpdateProfiles(userId, updateProfiles);
  getAndUpdateMatches(userId, updateMatches);
}

export function getAndUpdateGroups(userId, updateGroups) {
  const url = `/subscription/user/${userId}`;
  try {
    smatchServer.get(url).then(result => updateGroups(result.data))
  } catch (err) {
    printErrorDetails(error, url);
    return null;
  }
}

export function getAndUpdateProfiles(userId, updateProfiles) {
  const url = `/group/profiles/${userId}`;
  try {
    smatchServer.get(url).then(result => {updateProfiles(result.data)});
  } catch (err) {
    printErrorDetails(error, url);
    return null;
  }
}

export function getAndUpdateMatches(userId, updateMatches) {
  const url = `/group/matches/${userId}`;
  try {
    smatchServer.get(url).then(result => {updateMatches(result.data)});
  } catch (err) {
    printErrorDetails(error, url);
    return null;
  }
}


export async function createGroup(group) {
  const url = `/group/create`;
  let config = {
    headers: {
      auth: group.auth,
    }
  }
  try {
    return await smatchServer.post(url, group, config);
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function insertLike(groupId, userId, otherUserId) {
  const url = `/match/like/${groupId}/${userId}/${otherUserId}`;
  try {
    return await smatchServer.post(url);
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function insertDislike(groupId, userId, otherUserId) {
  const url = `/match/dislike/${groupId}/${userId}/${otherUserId}`;
  try {
    return await smatchServer.post(url);
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export function initMessages(loggedUserId, groupId, otherUser, addMessage, generateGiftedChatMessage) {
  const messages = [
    // {message: "Hey", sender: true},
    // {message: "Hey you!", sender: false},
  ]; // FIXME Fetch server message here

  for (let message of messages) {
    const msg = generateGiftedChatMessage(loggedUserId, otherUser, message.message, message.sender);
    addMessage(groupId, otherUser.id, [msg]);
  }
}

export async function registerForPushNotifications(userId, token) {
  const url = `/user/registerUserForPushNotifications/${userId}`;
  try {
    return await smatchServer.post(url, { token: token.data });
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function sendPushNotifications(userId) {
  const url = `/user/push/${userId}`;
  try {
    return await smatchServer.post(url);
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function getUserFieldsFromBE(userId, groupId, setFields) {
  const url = `/group/fields/${groupId}/${userId}`;
  try {
    let result = await smatchServer.get(url);
    setFields(result.data);
  } catch (err) {
    printErrorDetails(err, url);
  }
}
