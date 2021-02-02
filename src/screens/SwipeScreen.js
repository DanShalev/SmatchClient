import * as React from "react";
import {useEffect, useState} from "react";
import Profiles from "../components/swipe/Profiles";
import {getGroupSubscribers} from "../api/SmatchServerAPI";

export default function SwipeScreen({ route }) {
  const [groupProfiles, setGroupProfiles] = useState(null);

  useEffect(() => {
          getGroupSubscribers(route.params.groupId)
          .then(result => setGroupProfiles(result ? result : route.params.profiles));
      },
      []);

    return groupProfiles ? (<Profiles profilesProp={groupProfiles} />) : (<></>);
}
