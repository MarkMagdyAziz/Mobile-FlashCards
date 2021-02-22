import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { gray } from "../utils/colors";

function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingMessage}>Loading...</Text>
      <ActivityIndicator size="large" color={gray} />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  loadingMessage: {
    textAlign: "center",
    fontSize: 22,
    color: gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    height: 200,
  },
});
