import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, ScrollView, Text } from "react-native";
import styles from "./style/JoinGroupScreenStyle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { addUserToGroup, getAndUpdateGroups, getGroupById } from "../api/SmatchServerAPI";
import { Image } from "react-native-expo-image-cache";
import { selectUserFacebookId } from "../redux/slices/authSlice";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function JoinGroupScreen({ route }) {
  let [groupDetails, setGroupDetails] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const groupId = route.params.groupId;

  const loggedUserId = useSelector(selectUserFacebookId);

  useEffect(() => {
    setLoader(true);
    getGroupById(groupId, loggedUserId).then((response) => {
      setGroupDetails(response.data);
      setLoader(false);
      setAvatar(groupDetails.avatar);
    });
  }, [route]);

  useEffect(() => {
    if (!!groupDetails && !!groupDetails.avatar)
      setAvatar(groupDetails.avatar);
  }, [groupDetails]);

  return (
    groupDetails !== null && avatar !== null ? (
      <ScrollView>
        <ImageBackground source={require("../../assets/join_screen_design_header.png")} style={styles.background}>
          <Image uri={avatar} style={styles.image} preview={{ uri: avatar }} />
          <Text style={styles.name}>{groupDetails.name}</Text>
          <Text style={styles.members}>{groupDetails.numberOfMembers}</Text>
          <Text style={styles.description}>{groupDetails.description}</Text>
          <JoinGroupButton groupId={groupId} loggedUserId={loggedUserId} navigation={navigation} />
        </ImageBackground>
      </ScrollView>
    ) : (<ActivityIndicator animating={loader} size="large" color={colors.secondary} />)
  );
}

function JoinGroupButton({ groupId, loggedUserId, navigation }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.joinButton}
      onPress={() => {
        addUserToGroup(groupId, loggedUserId)
          .then(() => navigation.navigate("Home"))
          .then(() => getAndUpdateGroups(loggedUserId, dispatch));
      }}
    >
      <Text style={styles.joinButtonText}>Join</Text>
    </TouchableOpacity>
  );
}

