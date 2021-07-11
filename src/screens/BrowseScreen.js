import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ResultsList from "../components/browse/ResultsList";
import { getAllGroups } from "../api/SmatchServerAPI";
import SearchBar from "../components/browse/SearchBar";

export default function BrowseScreen() {
  const [groups, setGroups] = useState([]);
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    getAllGroups(setGroups, setResults);
  }, []);

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchGroups(term, groups, setResults)}
      />
      <ScrollView>
        <ResultsList title="Sports" results={shuffle(results)} />
        <ResultsList title="Food" results={shuffle(results)} />
        <ResultsList title="Trips" results={shuffle(results)} />
        <ResultsList title="Study" results={shuffle(results)} />
      </ScrollView>
    </>
  );
}

function searchGroups(term, groups, setResults) {
  const results = groups.filter((item) => {
    return item.name.toLowerCase().includes(term.toLowerCase());
  });
  setResults(results);
}

function shuffle(results) {
  return [...results].sort(() => (Math.random() > .5) ? 1 : -1);
}
