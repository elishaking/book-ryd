import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { IBookQuery } from "../../../../models";

interface TProps {
  books: IBookQuery[];
  loading: boolean;
}

export const BookList = (props: TProps) => {
  return (
    <FlatList
      style={styles.list}
      onEndReachedThreshold={0.3}
      onEndReached={() => {
        console.log("loading...");
      }}
      ListFooterComponent={<Footer loading={props.loading} />}
      data={props.books}
      renderItem={(book) => {
        return (
          <View style={styles.item} key={book.item.id}>
            <Text>{book.item.volumeInfo.title}</Text>
          </View>
        );
      }}
    />
  );
};

const Footer = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <View>
      <ActivityIndicator animating />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
  item: {
    paddingVertical: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
});
