import Modal from "react-native-modal";
import {Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export function MatchModal({matchProfileImage, isVisible, onSwipeComplete, currentUserProfileImage}) {
    return (
      <Modal isVisible={isVisible}
             hasBackdrop={true}
             backdropColor={"black"}
             backdropOpacity={0.3}
             animationInTiming={500}
             onSwipeComplete={onSwipeComplete}
             swipeDirection={["left", "right", "down", "up"]}>
          <Pressable style={styles.modal} onPress={onSwipeComplete}>
              <ImageBackground style={styles.backgroundImage} imageStyle={{borderRadius: 15}}
                               source={require("../../../assets/matchBackground.jpg")}>
                  <View style={styles.smatchTextRow}>
                      <Image style={styles.smatchTextImage}
                             source={require("../../../assets/matchLogoGrey.png")}/>
                  </View>
                  <View style={styles.modalImagesRow}>
                      <Image style={styles.modalImage} source={{uri: matchProfileImage}}/>
                      {/*TODO replace mock with user image*/}
                      <Image style={styles.modalImage} source={{uri: currentUserProfileImage}}/>
                  </View>
                  <TouchableOpacity style={styles.messageBox}>
                      <Text style={styles.messageText}>Send a message</Text>
                  </TouchableOpacity>
              </ImageBackground>
          </Pressable>
      </Modal>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    smatchTextImage: {
        width: 300,
        height: 110,
        borderRadius: 15
    },
    messageText: {
        fontWeight: "bold",
        paddingTop: 9,
        color: "white",
        textAlign: "center",
    },
    messageBox: {
        alignSelf: "center",
        width: 135,
        height: 40,
        backgroundColor: "tomato",
        borderRadius: 30,
        marginTop: 40
    },
    modal: {
        flex: 0.60,
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: "whitesmoke",
    },
    smatchTextRow: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 20,
    },
    modalImagesRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 25,
    }
});
