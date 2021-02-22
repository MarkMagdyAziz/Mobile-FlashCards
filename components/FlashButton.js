import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { steelblue, white, gray } from "./../utils/colors";
const FlashButton = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 33,
    elevation: 8,
    backgroundColor: steelblue,
    borderRadius: 2,
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  containerOutline: {
    backgroundColor: "transparent",
    borderColor: gray,
  },
});

export default FlashButton;
