import * as React from "react";
import { useEffect } from "react";
import Profiles from "../components/swipe/Profiles";
import { getProfiles } from "../api/SmatchServerAPI";
import { connect } from "react-redux";
import { addProfile } from "../redux/actions/actionCreators";

function SwipeScreen({ currentGroupId, addProfile, loggedUserId }) {
  useEffect(() => {
    getProfiles(currentGroupId, loggedUserId, addProfile);
  }, []);

  return <Profiles />;
}

const mapStateToProps = (state) => ({
  currentGroupId: state.groups.currentGroupId,
  loggedUserId: state.authentication.id,
});
const mapDispatchToProps = { addProfile: addProfile };
export default connect(mapStateToProps, mapDispatchToProps)(SwipeScreen);
