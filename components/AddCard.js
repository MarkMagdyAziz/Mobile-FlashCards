import * as React from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import FlashButton from "./FlashButton";
import { steelblue, white, gray } from "./../utils/colors";
import { connect } from "react-redux";
import { addCardToDeck } from "./../actions/index";
import { _addCardToDeck } from "../utils/api";
const AddCard = (props) => {
  const theme = {
    colors: {
      primary: steelblue,
      accent: white,
    },
  };
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const handleSubmit = () => {
    const { dispatch, navigation, route } = props;
    const deckId = route.params.title ?? "undefined";
    const card = {
      question,
      answer,
    };

    dispatch(addCardToDeck(deckId, card));
    _addCardToDeck(deckId, card);
    setQuestion("");
    setAnswer("");

    navigation.goBack();
  };

  {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              value={question}
              onChangeText={(question) => setQuestion(question)}
              label="Question..."
              theme={theme}
              style={styles.textInput}
            />
            <TextInput
              label="Answer..."
              value={answer}
              onChangeText={(answer) => setAnswer(answer)}
              theme={theme}
              style={styles.textInput}
            />
            <View style={styles.btnContainer}>
              <FlashButton
                title={"Submit"}
                onPress={() => handleSubmit()}
                disabled={question === "" || answer === ""}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  inner: {
    padding: 24,
    margin: 5,
    flex: 1,
    justifyContent: "center",
  },

  textInput: {
    height: 40,
    borderBottomWidth: 1,
    width: "100%",
    borderRadius: 2,
    padding: 6,
    margin: 5,
  },
  btnContainer: {
    marginTop: 12,
  },
});

export default connect()(AddCard);
