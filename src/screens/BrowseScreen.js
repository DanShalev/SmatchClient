import {ScrollView, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from "react";
import ResultsList from "../components/browse/ResultsList";
import SearchBar from "../components/browse/SearchBar";
import { useSelector } from "react-redux";
import { selectBrowseGroups, selectCategories } from "../redux/slices/browseSlice";

export default function BrowseScreen() {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState('');
  const [categories, setCategories] = useState([]);

  const browseGroups = useSelector(selectBrowseGroups);
  const categoriesList = useSelector(selectCategories);

  useEffect(() => {
    setCategories(categoriesList);
    setResults(browseGroups);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchGroups(term, browseGroups, setResults)}
      />
      <ScrollView>
        {categories.map((category, i) => <ResultsList key={i} title={category} results={results.filter(group => group.category === category)} />)}
      </ScrollView>
    </View>
  );
}

function searchGroups(term, groups, setResults) {
  const results = groups.filter((item) => {
    return item.name.toLowerCase().includes(term.toLowerCase());
  });
  setResults(results);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  }
});

