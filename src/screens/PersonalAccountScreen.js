import React from "react";
import { connect } from "react-redux";
import { Account } from "../components/account/Account";

function PersonalAccountScreen({ currentUserData }) {
  const { name, age, gender, pictures } = currentUserData;

  const fields = [{
      name: "Age",
      data: age.toString(),
    },
    {
      name: "Gender",
      data: gender
    }];

  return (
    <Account pictures={pictures} name={name} fields={fields} />
  );
}

const mapStateToProps = (state) => ({
  currentUserData: state.mainReducer.currentUserData,
});
export default connect(mapStateToProps, null)(PersonalAccountScreen);
