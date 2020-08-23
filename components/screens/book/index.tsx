import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../models";

interface TProps {
  route: RouteProp<RootStackParamList, "Book">;
}

export const BookScreen = ({ route }: TProps) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{route.params.id}</Text>
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
