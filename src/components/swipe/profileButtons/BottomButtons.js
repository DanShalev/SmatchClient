import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";
import React, {useState} from "react";
import {nonCssStyles} from "./IconStyle";
import Modal from 'react-native-modal';


export function BottomButtons({profiles, setProfiles}) {
  const [lastProfile, ...restOfProfiles] = profiles;
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const toggleModalAndSwipe = () => {
    setIsVisible(!isVisible);
    setProfiles(restOfProfiles)
  }

  return (
    lastProfile && (
      <View>
        <Modal isVisible={isVisible}
               hasBackdrop={true}
               backdropColor={"black"}
               backdropOpacity={0.3}
               animationInTiming={500}
               onSwipeComplete={toggleModalAndSwipe}
               swipeDirection={["left", "right", "down", "up"]}>
          <Pressable style={styles.modal} onPress={toggleModalAndSwipe}>
            <View style={styles.smatchTextRow}>
              <Text style={styles.smatchText}> It's a Smatch!</Text>
            </View>
            <View style={styles.modalImagesRow}>
              <Image style={styles.modalImage} source={lastProfile.profile}/>
              <View style={styles.modalUserImage}>
                <Text>User picture</Text>
              </View>
            </View>
          </Pressable>
        </Modal>


        <View style={styles.footer}>
          <View style={styles.circle}>
            <Icon
              name="x"
              size={nonCssStyles.icons.iconSize}
              color={nonCssStyles.icons.nopeIconColor}
              onPress={() => setProfiles(restOfProfiles)}
            />
          </View>
          <View style={styles.circle}>
            <Icon
              name="heart"
              size={nonCssStyles.icons.iconSize}
              color={nonCssStyles.icons.likeIconColor}
              onPress={toggleModal}
            />
          </View>
        </View>
      </View>
    ));
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
  modal: {
    flex: 0.35,
    alignContent: "center",
    backgroundColor: "whitesmoke",
    borderRadius: 15,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  modalUserImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "burlywood",
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  smatchTextRow: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 10,
    marginBottom: 30,
  },
  smatchText: {
    fontSize: 35,
  },
  modalImagesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});