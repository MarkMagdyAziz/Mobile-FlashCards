import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import FlashButton from "./FlashButton";
import { addDeck } from "./../actions/index";
import { TextInput } from "react-native-paper";
import { steelblue, white, gray } from "./../utils/colors";
import { saveDeckTitle } from "./../utils/api";

const theme = {
  colors: {
    primary: steelblue,
    accent: white,
  },
};
class AddDeck extends Component {
  state = {
    title: "",
  };
  handleChange = (title) => {
    this.setState({
      title,
    });
  };
  handleSubmit = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    if (title === "") {
      return Alert.alert(" Add Deck Title!");
    }
    dispatch(addDeck(title));
    saveDeckTitle(title);
    this.setState(() => ({ title: "" }));
    navigation.goBack();
    // navigation.navigate("DeckDetals", { title: deck.title });
  };
  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              label="Deck Title..."
              value={title}
              style={styles.textInput}
              onChangeText={this.handleChange}
              theme={theme}
            />
            <View style={styles.btnContainer}>
              <FlashButton
                title={"Create Deck"}
                onPress={this.handleSubmit}
                disabled={title === ""}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },

  textInput: {
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
    fontWeight: "bold",
  },
  btnContainer: {
    marginTop: 12,
  },
});

export default connect()(AddDeck);
