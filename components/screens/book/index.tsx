import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const BookScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Book</Text>
    </View>
  );
};

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
