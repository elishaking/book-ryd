import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

import { Input } from "./components/atoms";
import { BookList } from "./components/organisms";
import { IBookQuery } from "./models";

let timer: number | undefined;

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<IBookQuery[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = (text: string) => {
    setLoading(true);
    setQuery(text);
    if (timer !== undefined) clearTimeout(timer);

    const url = `https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=0&maxResults=20&fields=items.id,items.volumeInfo.title`;
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
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input placeholder="Search Books" onChangeText={fetchBooks} />
      <BookList books={books} loading={loading} />
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
    justifyContent: "center",
  },
});
