import React from "react";
import { FlatList, View, Text } from "react-native";

interface TProps {
  books: any[];
}

export const BookList = (props: TProps) => {
  return (
    <FlatList
      data={props.books}
      renderItem={(book) => {
        return (
          <View key={book.item.id}>
            <Text>{book.item.volumeInfo.title}</Text>
          </View>
        );
      }}
    />
  );
};
