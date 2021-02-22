import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { textGray } from "../utils/colors";
import { connect } from "react-redux";
import { white } from "../utils/colors";
const Deck = (props) => {
  // console.log("Deck props", props);
  const { deck } = props;
  if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>
          {deck.questions.length} cards
          {/* {console.log("decks: ", deck.questions.length)} */}
        </Text>
      </View>
    </View>
  );
};

function mapStateToProps(decks, { id }) {
  const deck = decks[id];
  return {
    deck,
  };
}
const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
  },
  deckText: {
    fontSize: 28,
  },
  cardText: {
    fontSize: 18,
    color: textGray,
  },
});

export default connect(mapStateToProps)(Deck);
