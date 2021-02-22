import { getDecks } from "./../utils/api";
export const actionTypes = {
  RECEIVE_DECKS: "RECEIVE_DECKS",
  ADD_DECK: "ADD_DECK",
  REMOVE_DECK: "REMOVE_DECK",
  ADD_CARD_TO_DECK: "ADD_CARD_TO_DECK",
  RESET_STORE: "RESET_STORE",
};

export function receiveDecks(decks) {
  return {
    type: actionTypes.RECEIVE_DECKS,
    decks,
  };
}
export function addDeck(title) {
  return {
    type: actionTypes.ADD_DECK,
    title,
  };
}
export function removeDeck(id) {
  return {
    type: actionTypes.REMOVE_DECK,
    id,
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: actionTypes.ADD_CARD_TO_DECK,
    deckId,
    card,
  };
}
export function resetStore() {
  return {
    type: actionTypes.RESET_STORE,
  };
}
export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}
