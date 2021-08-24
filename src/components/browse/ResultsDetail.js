import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { appendImagePrefix } from "../../redux/utils/utils";

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: appendImagePrefix(result.avatar) }} />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.numberOfMembers}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
      marginBottom: 30
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 7,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ResultsDetail;
