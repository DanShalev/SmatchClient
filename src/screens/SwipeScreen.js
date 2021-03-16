import * as React from "react";
import { useEffect } from "react";
import Profiles from "../components/swipe/Profiles";
import { getGroupProfiles } from "../api/SmatchServerAPI";
import { connect } from "react-redux";
import { addProfile } from "../redux/actions/actionCreators";

function SwipeScreen({ currentGroupId, addProfile }) {
  useEffect(() => {
    getGroupProfiles(currentGroupId, addProfile);
  }, []);

  return <Profiles />;
}

const mapStateToProps = (state) => ({ currentGroupId: state.groupsInfo.currentGroupId });
const mapDispatchToProps = { addProfile: addProfile };
export default connect(mapStateToProps, mapDispatchToProps)(SwipeScreen);
