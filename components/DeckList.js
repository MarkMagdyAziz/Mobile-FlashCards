import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import { green, gray, steelblue } from "./../utils/colors";
import { handleInitialData } from "./../actions/index";
import Loading from "./Loading";
class DeckList extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    if (this.props.loading === true) {
      return <Loading />;
    }
    const { decks, navigation } = this.props;
    //console.log("DeckList props: ", this.props);
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Udaci Flashcards</Text>

          {Object.values(decks).map((deck) => {
            return (
              <TouchableOpacity
                key={deck.title}
                onPress={() => navigation.navigate("DeckDetails", deck.title)}
              >
                <Deck id={deck.title} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 16,
    color: steelblue,
  },
});
function mapStateToProps(state) {
  return {
    decks: state,
    loading: state === null ? true : false,
  };
}
export default connect(mapStateToProps, { handleInitialData })(DeckList);
