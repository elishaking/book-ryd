import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

import { Input } from "./components/atoms";

let timer: number | undefined;

export default function App() {
  const [query, setQuery] = useState("");
  let prevQuery = "";

  const fetchBooks = (text: string) => {
    setQuery(text);
    console.log(timer);
    if (timer !== undefined) clearTimeout(timer);

    timer = setTimeout(() => {
      prevQuery = query;
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=2&fields=items.id,items.volumeInfo.title`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          timer = undefined;
        });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input placeholder="Search Books" onChangeText={fetchBooks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
