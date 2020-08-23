import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

import { Input } from "./components/atoms";
import { BookList } from "./components/organisms";

let timer: number | undefined;

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);

  const fetchBooks = (text: string) => {
    setQuery(text);
    if (timer !== undefined) clearTimeout(timer);

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=2&fields=items.id,items.volumeInfo.title`;
    timer = setTimeout(() => {
      axios
        .get(url)
        .then((res) => {
          setBooks(res.data.items);
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
      <BookList books={books} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
