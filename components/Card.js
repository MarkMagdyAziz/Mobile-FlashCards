import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { blue, darkGray, white } from "../utils/colors";

const Card = (props) => {
  const [flipCard, setFlipCard] = React.useState(false);
  const { card, index, deck } = props;

  const onPress = () => {
    setFlipCard(!flipCard);
  };
  return (
    <View style={styles.card}>
      {!flipCard ? (
        <Text style={styles.content}>Question:{card.question}</Text>
      ) : (
        <Text style={styles.content}>
          Answer:{" "}
          {typeof card.answer === "boolean"
            ? card.answer.ToString()
            : card.answer}
        </Text>
      )}
      <Text style={styles.text}>
        {index + 1} of {deck.questions.length}
      </Text>
      <Button icon="gesture-swipe" onPress={() => onPress()} color={blue}>
        Flip Card
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    minHeight: 250,
    minWidth: "80%",
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    padding: 20,
    backgroundColor: white,
    borderRadius: 10,
    shadowColor: darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
});
export default Card;
