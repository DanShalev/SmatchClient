import React from "react";
import { useSelector } from "react-redux";
import { Account } from "../components/account/Account";
import { selectCurrentUserData } from "../redux/slices/authSlice";

export default function PersonalAccountScreen() {
  const currentUserData = useSelector(selectCurrentUserData);
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
