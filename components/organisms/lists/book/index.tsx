import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { IBookQuery } from "../../../../models";

interface TProps {
  books: IBookQuery[];
  loading: boolean;
  fetchBooks: () => void;
}

export const BookList = (props: TProps) => {
  return (
    <FlatList
      style={styles.list}
      onEndReachedThreshold={0.01}
      onEndReached={() => {
        props.fetchBooks();
      }}
      ListFooterComponent={<Footer loading={props.loading} />}
      data={props.books}
      renderItem={(book) => {
        return (
          <TouchableOpacity style={styles.item} key={book.item.id}>
            <Text>{book.item.volumeInfo.title}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const Footer = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <View style={styles.footer}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  item: {
    paddingVertical: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  footer: {
    marginTop: 10,
  },
});
