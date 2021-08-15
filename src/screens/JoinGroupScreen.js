import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image as RNImage, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import colors from "../config/colors";
import {InviteButton, JoinGroupButton} from "../components/utils/JoinGroupUtils";
import {getGroupById} from "../api/SmatchServerAPI";
import {updateGroups} from "../redux/actions/actionCreators";
import {Image} from "react-native-expo-image-cache";
import {LinearGradient} from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";


function JoinGroupScreen({route, loggedUserId, groups, updateGroups}) {
  let [groupDetails, setGroupDetails] = useState(null);
  const [avatar, setAvatar] = useState(null)
  const [isJoin, setIsJoin] = useState(false)
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const groupId = route.params.groupId;


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
          <RNImage style={styles.image} source={{uri: avatar}}/>
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
            (groupDetails && <JoinGroupButton groupId={groupId} updateGroups={updateGroups} loggedUserId={loggedUserId}
                                              navigation={navigation}/>)
            : (
              <InviteButton groupId={groupId}/>
            )}
        </View>
      </View>) : null
  );
}


const mapStateToProps = (state) => ({
  loggedUserId: state.mainReducer.currentUserData.id,
  groups: state.mainReducer.groups
});

const mapDispatchToProps = {updateGroups};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.tertiary
  },
  image: {
    flex: 0.4,
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    color: colors.accountTitle,
    fontSize: 25,
    bottom: 40,
  },
  members: {
    marginTop: 5,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.secondary,
  },
  description: {
    fontWeight: "bold",
    marginLeft: 10, marginTop: 15,
    color: colors.primary,
  },
  button: {
    flex: 0.2,
    justifyContent: "center",
    alignSelf: "center",
  },
  gradient: {
    opacity: 0.2,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 355,
    height: "40%",
  },
});


