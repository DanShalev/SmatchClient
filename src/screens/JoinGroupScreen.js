import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image as RNImage, Text, View} from "react-native";
import styles from "./style/JoinGroupScreenStyle"
import { useSelector } from "react-redux";
import {useNavigation} from "@react-navigation/native";
import colors from "../config/colors";
import {InviteButton, JoinGroupButton} from "../components/utils/JoinGroupUtils";
import {getGroupById} from "../api/SmatchServerAPI";
import {Image} from "react-native-expo-image-cache";
import {LinearGradient} from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import { selectGroups } from "../redux/slices/groupsSlice";
import { selectUserFacebookId } from "../redux/slices/authSlice";


export default function JoinGroupScreen({route}) {
  let [groupDetails, setGroupDetails] = useState(null);
  const [avatar, setAvatar] = useState(null)
  const [isJoin, setIsJoin] = useState(false)
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const groupId = route.params.groupId;

  const groups = useSelector(selectGroups);
  const loggedUserId = useSelector(selectUserFacebookId);

  useEffect(() => {
    if (groups[groupId] === undefined) {
      setLoader(true)
      setIsJoin(true)
      getGroupById(groupId, loggedUserId).then((response) => {
        setGroupDetails(response.data);
        setLoader(false);
      })
    } else {
      setGroupDetails(groups[groupId])
      updateGroupAvatar(groups[groupId].avatar).then((res) => setAvatar(res))
    }
  }, [route])


  const updateGroupAvatar = async (avatar) => {
    if (avatar === null){
      // null avatar fails in avatar.startsWidth
      return ""
    }
    if (avatar.startsWith("file")) {
      return await FileSystem.readAsStringAsync(avatar);
    }
    return avatar
  }

  return (
    groupDetails !== null && avatar !== null ? (
      <View style={styles.container}>
        {avatar.startsWith("http") ? (<Image uri={avatar} style={styles.image} preview={{uri: avatar}}/>
        ) : (
          <RNImage style={styles.image} source={ avatar !== "" ? {uri: avatar} : require("../../assets/emptyGroup.png")}/>
        )}
        <Text style={styles.name}>{groupDetails.name}</Text>
        <LinearGradient colors={["transparent", "black"]} style={styles.gradient}/>
        <View style={{flex: 0.4}}>
          {groupDetails && <Text style={styles.members}>{groupDetails.numberOfMembers}</Text>}
          {groupDetails && <Text style={styles.description}>{groupDetails.description}</Text>}
          <ActivityIndicator animating={loader} size="large" color={colors.secondary}/>
        </View>
        <View style={styles.button}>
          {isJoin ?
            (groupDetails && <JoinGroupButton groupId={groupId} loggedUserId={loggedUserId} navigation={navigation}/>)
            : (
              <InviteButton groupId={groupId}/>
            )}
        </View>
      </View>) : null
  );
}

