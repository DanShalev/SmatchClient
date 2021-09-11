import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from "./style/ResultsListStyle"
import ResultsDetail from './ResultsDetail';

const ResultsList = ({ title, results }) => {
  if (!results.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={result => result.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ResultsList;
