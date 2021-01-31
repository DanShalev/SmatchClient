import * as React from "react";
import Profiles from "../components/swipe/Profiles";
import {useEffect, useState} from "react";
import {getGroupSubscribers} from "../api/smathServerAPI";

export default function SwipeScreen({ route }) {
  const [groupProfiles, setGroupProfiles] = useState(null);

  useEffect(() => {
          updateProfileBasedOnServerRequest(route.params, setGroupProfiles);
      },
      []);

    return groupProfiles ? (<Profiles profilesProp={groupProfiles} />) : (<></>);
}


async function updateProfileBasedOnServerRequest(params, setGroupProfiles) {
    const mocksProfiles = params.profiles;

    const response = await getGroupSubscribers(params.groupId);
    response ? setGroupProfiles(response) : setGroupProfiles(mocksProfiles);
}
