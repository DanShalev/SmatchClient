import React, { useEffect, useState } from "react";
import { ScrollView, Share, Text } from "react-native";
import styles from "./style/GroupDescriptionScreenStyle";
import { Image } from "react-native-expo-image-cache";
import { useSelector } from "react-redux";
import { selectGroups } from "../redux/slices/groupsSlice";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Linking from "expo-linking";

export default function GroupDescriptionScreen(props) {
  const [groupDetails, setGroupDetails] = useState("");
  const currentGroupId = props.route.params.groupId;
  const groups = useSelector(selectGroups);

  useEffect(() => {
    if (!!currentGroupId) {
      setGroupDetails(groups[currentGroupId]);
    }
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: Linking.createURL("join/") + currentGroupId
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    !!groupDetails ? (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: "center" }}>
        <Image uri={groupDetails.avatar} style={styles.image} />
        <Text style={styles.groupName}>{groupDetails.name}</Text>
        <Text style={styles.members}>{groupDetails.numberOfMembers}</Text>
        <Text style={styles.description}>{groupDetails.description}</Text>
        <Button buttonStyle={styles.button} icon={<Icon name={"share-alt"} size={20} color={"black"} />}
                nPress={() => onShare()} />
      </ScrollView>
    ) : null
  );
}