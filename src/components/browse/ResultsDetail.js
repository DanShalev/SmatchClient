import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from "./style/ResultsDetailStyle"
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

export default ResultsDetail;
