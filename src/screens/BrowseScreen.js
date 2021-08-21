import {ScrollView, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from "react";
import ResultsList from "../components/browse/ResultsList";
import SearchBar from "../components/browse/SearchBar";
import {connect} from 'react-redux';

function BrowseScreen({ browseGroups, categoriesList }) {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState('');
  const [categories, setCategories] = useState([]);

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

const mapStateToProps = (state) => ({
  browseGroups: state.mainReducer.browseGroups,
  categoriesList: state.mainReducer.categories,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BrowseScreen);


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

