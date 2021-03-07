import * as React from "react";
import {useEffect, useState} from "react";
import Profiles from "../components/swipe/Profiles";
import {getGroupSubscribers} from "../api/SmatchServerAPI";
import { indiaTripPartnersProfiles } from "../../mocks/ProfilesMocks";
import { connect } from "react-redux";

function SwipeScreen({ currentSubscriptionId }) {
  const [groupProfiles, setGroupProfiles] = useState(null);

  useEffect(() => {
          getGroupSubscribers(currentSubscriptionId)
          .then(result => setGroupProfiles(result ? result : indiaTripPartnersProfiles));
      },
      []);

    return groupProfiles ? (<Profiles profilesProp={groupProfiles} />) : (<></>);
}

const mapStateToProps = (state) => ({ currentSubscriptionId: state.subscriptions.currentSubscriptionId });
export default connect(mapStateToProps, null)(SwipeScreen);
