import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { blue, green, red } from "../utils/colors";

import FlashButton from "./FlashButton";
import { Button } from "react-native-paper";
import Card from "./Card";
import {
  clearLocalNotifications,
  setLocalNotifications,
} from "../utils/helpers";

const _Quiz = (props) => {
  // React.useEffect(() => {
  //   // Update the document title using the browser API
  //   clearLocalNotifications().then(setLocalNotifications);
  // });
  //________________________________________________________
  const answer = {
    CORRECT: "correct",
    INCORRECT: "incorrect",
  };
  //___________________________Start State__________________________
  const [index, setIndex] = React.useState(0);

  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  //_________________________End State_____________________________________
  const { deck } = props;
  const { questions } = deck;
  //________________________________________________________________________
  const result = ((correct / questions.length) * 100).toFixed(2);
  const resultStyle =
    result >= 70 ? styles.resultTextGood : styles.resultTextBad;
  //______________________________________________________________________
  const handleOnPress = (response) => {
    const lastIndex = deck.questions.length;

    if (response === answer.CORRECT) {
      setCorrect(correct + 1);
      setIndex(index < lastIndex ? index + 1 : index);
    } else {
      setIncorrect(incorrect + 1);
      setIndex(index < lastIndex ? index + 1 : index);
    }
  };

  const handleRestartQuiz = () => {
    //todo
    setIndex(0);
    setCorrect(0);
    setIncorrect(0);
  };
  const handleFinishQuiz = () => {
    setCorrect(0);
    setIncorrect(0);
    clearLocalNotifications().then(setLocalNotifications);
    return props.navigation.navigate("Decks");
    //console.log("Deck", deck.title);
  };

  if (questions.length === 0)
    return (
      <View style={styles.finalMessage}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          No Cards!
        </Text>
      </View>
    );

  return (
    <View style={styles.quizContainer}>
      {deck.questions[index] ? (
        <View>
          <Card index={index} deck={deck} card={deck.questions[index]} />
          <View>
            <FlashButton
              title={"Correct"}
              onPress={() => handleOnPress(answer.CORRECT)}
            />
            <FlashButton
              title={"InCorrect"}
              onPress={() => handleOnPress(answer.INCORRECT)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={resultStyle}>Quiz Complete!</Text>
          <Text style={resultStyle}>You Got {result}% of correct answers</Text>
          <View>
            <Button
              icon="keyboard-backspace"
              onPress={() => handleFinishQuiz()}
              tyle={styles.btn}
              color={blue}
            >
              Back To Decks
            </Button>
            <Button
              icon="restart"
              onPress={() => handleRestartQuiz()}
              style={styles.btn}
              color={blue}
            >
              Restart The Quiz
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

function mapStateToProps(state, { route }) {
  const title = route.params.title ?? "undefined";
  const deck = state[title];
  return {
    deck,
  };
}
const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  finalMessage: {
    fontSize: 22,
    textAlign: "center",
    margin: 20,
  },
  messageContainer: {
    height: 200,
  },
  resultTextGood: {
    color: green,
    fontSize: 46,
    textAlign: "center",
  },
  resultTextBad: {
    color: red,
    fontSize: 46,
    textAlign: "center",
  },
});

export default connect(mapStateToProps)(_Quiz);
