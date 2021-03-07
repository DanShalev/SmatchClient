import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { getUserSubscriptions } from "../api/SmatchServerAPI";
import { Avatar, ListItem } from "react-native-elements";
import React from "react";
import { SmatchesBadge, MessagesBadge } from "../components/Badges";
import { connect } from "react-redux";
import colors from "../config/colors";
import { addUserSubscription, updateCurrentViewedSubscription } from "../redux/actions/actionCreators";

function GroupsScreen({ navigation, loggedUserId, addUserSubscription, userSubscriptions,
                        updateCurrentViewedSubscription }) {

  useEffect(() => {
    getUserSubscriptions(loggedUserId, addUserSubscription);
  }, []);

  const areSubscriptionsAvailable = Object.keys(userSubscriptions).length > 0;

  return (
    <ScrollView>
      {!areSubscriptionsAvailable
        ? <ServerOfflineErrorMessage/>
         : Object.keys(userSubscriptions).map((groupKey, i) => {
           let group = userSubscriptions[groupKey];
           return (
         <ListItem
           key={i}
           bottomDivider
           onPress={() => {
             updateCurrentViewedSubscription(groupKey);
             navigation.navigate("Home", {screen: "SwipeScreen", params: {screen: "Swipe" }});
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
       )})}
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  loggedUserId: state.authentication.id,
  userSubscriptions: state.subscriptions.subscriptions,
});
const mapDispatchToProps = { addUserSubscription, updateCurrentViewedSubscription }
export default connect(mapStateToProps, mapDispatchToProps)(GroupsScreen);

function ServerOfflineErrorMessage() {
  return (<>
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
