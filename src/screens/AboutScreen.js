import React from "react";
import { Text, View } from "react-native";
import styles from "./style/AboutScreenStyle"

export default function AboutScreen() {
  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.title}>Welcome to Smatch!</Text>
      <Text style={styles.description}>
        The ultimate tinder for everything!
      </Text>
      <Text style={styles.description}>
        Looking for some roommates or a dog walker? perhaps a buddy to write
        your next cs assignment with?
      </Text>
      <Text style={styles.description}>
        well you came to the right place! Just join a group of your choosing and
        start Smatching :)
      </Text>
      <Text style={[styles.description, { marginTop: 100 }]}>
        Brought to you by the legendary GIDE
      </Text>
      <View style={styles.gide}>
        <Text style={styles.description}>
          <B>G</B>uy
        </Text>
        <Text style={styles.description}>
          <B>I</B>tay
        </Text>
        <Text style={styles.description}>
          <B>D</B>an
        </Text>
        <Text style={styles.description}>
          <B>E</B>lad
        </Text>
      </View>
    </View>
  );
}
