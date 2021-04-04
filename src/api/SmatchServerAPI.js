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
    console.log('Error: ', error.message);
  }
}

export async function getProfiles(groupId, userId, addProfile) {
  const url = `/group/${groupId}/${userId}`;
  try {
    let result = await smatchServer.get(url);
    for (let profile of result.data) {
      addProfile(profile.id, profile.name, profile.age, profile.sex, profile.imageUrl, groupId)
    }
    return true
  } catch (err) {
    printErrorDetails(error, url);
    return null;

  }
}

export async function getGroups(userId, addGroup) {
  const url = `/subscription/user/${userId}`;
  try {
    let result = await smatchServer.get(url);
    for (let group of result.data) {
      addGroup(group.id, group.name, group.avatarUrl, group.numberOfMembers, group.fields);
    }
  } catch (err) {
    printErrorDetails(error, url);
    return null;
  }
}

export async function createGroup(group) {
  const url = `/group/create`;
  try {
    return await smatchServer.post(url, group);
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function insertLike(groupId, userId, otherUserId) {
  const url = `/match/like/${groupId}/${userId}/${otherUserId}`;
  try {
    return await smatchServer.post(url)
  } catch (err) {
    printErrorDetails(error, url);
  }
}

export async function insertDislike(groupId, userId, otherUserId) {
  const url = `/match/dislike/${groupId}/${userId}/${otherUserId}`;
  try {
    return await smatchServer.post(url)
  } catch (err) {
    printErrorDetails(error, url);
  }
}
