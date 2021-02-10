import smatchServer from "./SmatchServer";
import { transferProfilesServerDataToMocksFormat, transferGroupsServerDataToMocksFormat } from "./Utils";

export async function getGroupSubscribers(groupId) {
  const url = `/subscription/group/${groupId}`;
  try {
    return await smatchServer.get(url).then((result) => transferProfilesServerDataToMocksFormat(result.data));
  } catch (err) {
    console.log("Error while process server request ", url);
    return null;
  }
}

export async function getUserSubscriptions(userId) {
  const url = `/subscription/user/${userId}`;
  try {
    return await smatchServer.get(url).then((result) => transferGroupsServerDataToMocksFormat(result.data));
  } catch (err) {
    console.log("Error while process server request ", url);
    return null;
  }
}

export async function createGroup(group) {
  const url = `/group/create`;
  try {
    return await smatchServer.post(url, group);
  } catch (err) {
    console.log("Error while process server request ", url);
  }
}
