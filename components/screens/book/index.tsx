import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList, IBook } from "../../../models";
import { bookService } from "../../../services";

interface TProps {
  route: RouteProp<RootStackParamList, "Book">;
}

export const BookScreen = ({ route }: TProps) => {
  const [book, setBook] = useState<IBook>();
  const [loading, setLoading] = useState(true);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  useEffect(() => {
    // bookService
    //   .fetchById(route.params.id)
    //   .then((res) => {
    //     setBook(res.data);
    //     console.log(res.data.volumeInfo.imageLinks.extraLarge);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <Image
            style={styles.image}
            source={{
              uri: book?.volumeInfo.imageLinks.extraLarge,
              height: height / 2.3,
              width: width / 1.3,
              cache: "force-cache",
            }}
          />
          <View style={styles.authorContainer}>
            {book?.volumeInfo.authors.map((author) => (
              <Text key={author} style={styles.author}>
                {author}
              </Text>
            ))}
          </View>
          <Text style={styles.heading}>{book?.volumeInfo.title}</Text>
          <View>
            <View>
              <Text>Rating</Text>
              <Text>{book?.volumeInfo.averageRating || 0}</Text>
            </View>
            <View>
              <Text>Pages</Text>
              <Text>{book?.volumeInfo.pageCount}</Text>
            </View>
          </View>
          <Text style={styles.body}>{book?.volumeInfo.description}</Text>
        </ScrollView>
      )}
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
  image: {
    resizeMode: "contain",
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 23,
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    textAlign: "center",
  },
  authorContainer: {
    marginBottom: 10,
  },
  author: {
    textAlign: "center",
    color: "#a5a5a5",
    fontSize: 15,
  },
});
