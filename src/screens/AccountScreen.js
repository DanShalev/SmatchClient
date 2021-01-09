import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";

import MatchesScreenMocks from "../../mocks/MatchesScreenMocks";
import UserField from "../components/accountComponents/UserField";

export default function AccountScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.avatarContainer}>
        <Avatar source={{ uri: MatchesScreenMocks[0].avatar_url }} size={200} rounded />
      </View>
      <View style={{ marginTop: 60 }}>
        <UserField iconName="account" initialState="Ronit the bibistit" />
        <UserField iconName="map-marker" initialState="Tel Aviv - Yafo" />
        <UserField iconName="cake-variant" initialState="57" />
        <UserField iconName="gender-male-female" initialState="Female" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
