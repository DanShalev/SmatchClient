import smatchServer from "./SmatchServer";
import {transferProfilesServerDataToMocksFormat} from "./Utils";


export async function getGroupSubscribers(groupId) {
    const url = `/subscription/group/${groupId}`;
    try {
        return await smatchServer
            .get(url)
            .then(result => transferProfilesServerDataToMocksFormat(result.data));
    } catch (err) {
        console.log("Error while process server request ", url);
        return null;
    }
}

export async function createGroup(group) {
    const url = `/group/create`;
    try {
        return await smatchServer
            .post(url, group);
    } catch (err) {
        console.log("Error while process server request ", url);
    }
}
