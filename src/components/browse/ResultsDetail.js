import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { appendImagePrefix } from "../../redux/actions/actionUtils";

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
    marginRight: 15
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ResultsDetail;
