import Modal from "react-native-modal";
import {Image, ImageBackground, Pressable, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import styles from "./style/MatchModalStyle"

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