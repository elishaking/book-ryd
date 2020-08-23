import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { IBookQuery } from "../../../models";
import { bookService } from "../../../services";
import { Input } from "../../atoms";
import { BookList } from "../../organisms";

export const HomeScreen = ({ navigation }: StackScreenProps<{}>) => {
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
      <BookList
        books={books}
        loading={loading}
        fetchBooks={fetchMoreBooks}
        navigate={navigation.navigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
