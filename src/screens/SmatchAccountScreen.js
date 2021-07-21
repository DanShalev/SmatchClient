import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserFieldsFromBE } from "../api/SmatchServerAPI";
import { Account } from "../components/account/Account";

function SmatchAccountScreen({ route, currentGroupId }) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    getUserFieldsFromBE(route.params.id, currentGroupId, setFields);
  }, [route]);

  return (
    <Account image1={route.params.image} name={route.params.name} fields={fields} disablePictures />
  );
}

const mapStateToProps = (state) => ({
  currentGroupId: state.mainReducer.currentGroupId,
});
export default connect(mapStateToProps, null)(SmatchAccountScreen);
