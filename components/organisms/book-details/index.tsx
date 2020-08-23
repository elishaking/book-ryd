import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { IBook } from "../../../models";

interface DetailProps {
  title: string;
  subtitle: string;
}

interface TProps {
  book: IBook;
}

const Detail = ({ title, subtitle }: DetailProps) => {
  return (
    <View style={detailStyles.container}>
      <Text style={detailStyles.title}>{title}</Text>
      <Text style={detailStyles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export const BookDetails = ({ book }: TProps) => {
  return (
    <View style={styles.container}>
      <Detail
        title="Rating"
        subtitle={(book.volumeInfo.averageRating || 0) + ""}
      />
      <Detail title="Pages" subtitle={book.volumeInfo.pageCount + ""} />
      <Detail title="Lang" subtitle={book.volumeInfo.language.toUpperCase()} />
      <Detail title="Date" subtitle={book.volumeInfo.publishedDate || "N/A"} />
    </View>
  );
};

const detailStyles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
  },
  title: {
    color: "#a5a5a5",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
