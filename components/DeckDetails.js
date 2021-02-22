import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { removeDeck } from "../actions/index";
import Deck from "./Deck";
import FlashButton from "./FlashButton";
import Loading from "./Loading";
import { _removeDeck } from "./../utils/api";

class DeckDetails extends Component {
  state = {};
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  handleDelete = (id) => {
    const { dispatch, navigation, deck } = this.props;

    dispatch(removeDeck(id));
    _removeDeck(id);
    navigation.goBack();
    if (!deck) {
      return <Loading />;
    }
  };
  render() {
    const { navigation, deck } = this.props;
    const { title } = this.props.deck;

    return (
      <View style={styles.container}>
        <Deck id={title} />
        <View style={styles.buttonsContainer}>
          <FlashButton
            title={"Add Card"}
            onPress={() =>
              navigation.navigate("AddCard", { title: deck.title })
            }
          />
          <FlashButton
            title={"Start Quiz"}
            onPress={() => navigation.navigate("_Quiz", { title: deck.title })}
          />
        </View>
        <FlashButton
          title={"Remove Deck"}
          onPress={() => this.handleDelete(deck.title)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
// function mapStateToProps(state, { route, navigation }) {
//   //const title = navigation.getParam("title", "undefined");
//   //const deck = state[title];
//   return {
//     state,
//     route,
//     navigation,
//   };
// }
const mapStateToProps = (state, { route }) => {
  const title = route.params ?? "undefined";
  const deck = state[title];

  return {
    deck,
  };
};
export default connect(mapStateToProps)(DeckDetails);
