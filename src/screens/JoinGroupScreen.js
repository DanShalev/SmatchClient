import React, {useEffect, useState} from "react";
import {ActivityIndicator, ImageBackground, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import colors from "../config/colors";
import {InviteButton, JoinGroupButton} from "../components/utils/JoinGroupUtils";
import {getGroupById} from "../api/SmatchServerAPI";
import {updateGroups} from "../redux/actions/actionCreators";
import {appendImagePrefix} from "../redux/actions/actionUtils";


function validatePrefix(avatar) {
  return avatar.startsWith("data:image") ? avatar : appendImagePrefix(avatar);
}

function JoinGroupScreen({route, loggedUserId, groups, updateGroups}) {
  let [groupDetails, setGroupDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const groupId = route.params.groupId;
  let join = false;

  useEffect(() => {
    if (groups[groupId] === undefined) {
      setLoader(true)
      getGroupById(groupId, loggedUserId).then((response) => {
        setGroupDetails(response.data)
        setLoader(false)
      }).catch((e) => console.log(e))
    }
  }, [route])

  if (groups[groupId] === undefined) {
    join = true;
  } else {
    groupDetails = groups[groupId];
  }

  return (

    <View style={styles.container}>
      {groupDetails && <ImageBackground source={{uri: validatePrefix(groupDetails.avatar)}} style={styles.image}>
        <Text style={styles.name}>{groupDetails.name}</Text>
      </ImageBackground>}
      <View style={{flex: 0.4}}>
        {groupDetails && <Text style={styles.members}>{groupDetails.numberOfMembers}</Text>}
        {groupDetails && <Text style={styles.description}>{groupDetails.description}</Text>}
        <ActivityIndicator animating={loader} size="large" color={colors.secondary}/>
      </View>
      <View style={styles.button}>
        {join ?
          (groupDetails && <JoinGroupButton groupId={groupId} updateGroups={updateGroups} loggedUserId={loggedUserId}
                                            navigation={navigation}/>)
          : (
            <InviteButton groupId={groupId}/>
          )}
      </View>
    </View>
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
    justifyContent: "flex-end"
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    color: colors.accountTitle,
    fontSize: 25,
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
  }
});


