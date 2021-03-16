import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { getGroups } from "../api/SmatchServerAPI";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";
import { SmatchesBadge, MessagesBadge } from "../components/Badges";
import { connect } from "react-redux";
import colors from "../config/colors";
import { addGroup, updateCurrentGroupId } from "../redux/actions/actionCreators";

function GroupsScreen({ navigation, loggedUserId, addGroup, groups, updateCurrentGroupId }) {
  useEffect(() => {
    getGroups(loggedUserId, addGroup);
  }, []);

  const areGroupsAvailable = Object.keys(groups).length > 0;

  return (
    <ScrollView>
      {!areGroupsAvailable ? (
        <ServerOfflineErrorMessage />
      ) : (
        Object.keys(groups).map((groupKey, i) => {
          let group = groups[groupKey];
          return (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => {
                updateCurrentGroupId(groupKey);
                navigation.navigate("Home", { screen: "SwipeScreen", params: { screen: "Swipe" } });
              }}
            >
              <Avatar source={{ uri: group.avatarUrl }} size="large" rounded />
              <ListItem.Content>
                <ListItem.Title>{group.name}</ListItem.Title>
                <ListItem.Subtitle>{group.numberOfMembers}</ListItem.Subtitle>
              </ListItem.Content>
              {group.newSmatches !== 0 ? <SmatchesBadge newMessages={group.newMessages} newSmatches={group.newSmatches} /> : null}
              {group.newMessages !== 0 ? <MessagesBadge newMessages={group.newMessages} /> : null}
            </ListItem>
          );
        })
      )}
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  loggedUserId: state.authentication.id,
  groups: state.groupsInfo.groups,
});
const mapDispatchToProps = { addGroup, updateCurrentGroupId };
export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);

function ServerOfflineErrorMessage() {
  return (
    <>
      <Text style={styles.errTextStyle}>Please load java server & ngrok to see results!</Text>
      <Text style={styles.errTextStyle}>Groups mocks are deprecated</Text>
    </>
  );
}

const styles = StyleSheet.create({
  errTextStyle: {
    fontSize: 50,
    textAlign: "center",
    backgroundColor: colors.secondary,
  },
});
