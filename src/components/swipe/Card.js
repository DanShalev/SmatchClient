import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TouchableHighlight } from "react-native";
import Animated from "react-native-reanimated";
import { navigateToSmatchAccountScreen } from "../../screens/MatchesScreen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({ profile, likeOpacity = 0, nopeOpacity = 0 }) {
  const [index, setIndex] = useState(0);
  const listSize = profile.pictures.length;

  const navigation = useNavigation();

  // Reset the index when profile id changes, for some reason the index is shared between all Card objects..
  useEffect(() => {
    setIndex(0);
  }, [profile.id]);

  const showPrev = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  const showNext = () => {
    if (index < listSize - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <ImageBackground style={styles.imageView} imageStyle={ styles.image }
                        source={{ uri: profile.pictures[index] }}>
        <LinearGradient colors={["transparent", "black"]} style={styles.gradient} />
      </ImageBackground>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.nope, { opacity: nopeOpacity }]}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.sideButtons}>
          <TouchableOpacity onPress={showPrev} style={styles.button} />
          <TouchableOpacity onPress={showNext} style={styles.button} />
        </View>
        <TouchableOpacity style={styles.footer} onPress={() => navigateToSmatchAccountScreen(navigation, profile)}>
          <Text style={styles.name}>{profile.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  image: {
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
  },
  sideButtons: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  name: {
    color: "white",
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
  gradient: {
    opacity: 0.9,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    borderRadius: 8,
  },
});
