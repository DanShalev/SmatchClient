import Modal from "react-native-modal";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";

export function MatchModal({matchProfileImage, isVisible, onSwipeComplete}) {
    return (
        <Modal isVisible={isVisible}
               hasBackdrop={true}
               backdropColor={"black"}
               backdropOpacity={0.3}
               animationInTiming={500}
               onSwipeComplete={onSwipeComplete}
               swipeDirection={["left", "right", "down", "up"]}>
            <Pressable style={styles.modal} onPress={onSwipeComplete}>
                <View style={styles.smatchTextRow}>
                    <Text style={styles.smatchText}> It's a Smatch!</Text>
                </View>
                <View style={styles.modalImagesRow}>
                    <Image style={styles.modalImage} source={matchProfileImage}/>
                    <View style={styles.modalUserImage}>
                        <Text>User picture</Text>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
