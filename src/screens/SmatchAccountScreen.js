import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserFieldsFromBE } from "../api/SmatchServerAPI";
import { Account } from "../components/account/Account";
import { selectCurrentGroupId } from "../redux/slices/groupsSlice";

export default function SmatchAccountScreen({ route }) {
  const [fields, setFields] = useState([]);

  const currentGroupId = useSelector(selectCurrentGroupId);

  useEffect(() => {
    getUserFieldsFromBE(route.params.id, currentGroupId, setFields);
  }, [route]);

  return (
    <Account pictures={[route.params.image]} name={route.params.name} fields={fields} disablePictures/>
  );
}
