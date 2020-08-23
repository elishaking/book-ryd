import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

import { Input } from "./components/atoms";
import { BookList } from "./components/organisms";
import { IBookQuery, IFetchBooksOptions } from "./models";
import { bookService } from "./services";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<IBookQuery[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = (text: string) => {
    setQuery(text);
    setLoading(true);
    bookService.fetchByQuery(text, 0).then((books) => {
      setBooks(books);
      setLoading(false);
    });
  };

  const fetchMoreBooks = () => {
    setLoading(true);
    bookService.fetchByQuery(query).then((moreBooks) => {
      if (moreBooks.length > 0) setBooks([...books, ...moreBooks]);
      setLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input placeholder="Search Books" onChangeText={fetchBooks} />
      <BookList books={books} loading={loading} fetchBooks={fetchMoreBooks} />
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
