import smatchServer from "./smatchServer";
import {transerProfilesServerDataToMocksFormat} from "./utils";

export async function getGroupSubscribers(groupId) {
    try {
        const response = await smatchServer.get(`/subscription/group/${groupId}`);
        return transerProfilesServerDataToMocksFormat(response.data);
    } catch (err) {
        console.log("Error while process server request ", `/subscription/group/${groupId}`);
        return null;
    }
}
