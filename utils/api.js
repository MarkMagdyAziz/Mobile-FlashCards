import AsyncStorage from "@react-native-async-storage/async-storage";
const DECKS_STORAGE_KEY = "MobileFlashcards:decks";

// getDecks: return all of the decks along with their , questions, and answers.
export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return decks != null ? JSON.parse(decks) : null;
  } catch (e) {
    console.warn("Error getDecks!", e);
  }

  console.log(" getDecks Done.");
};
// getDeck: take in a single (id) argument and return the deck associated with that id.
export const getDeck = async (id) => {
  try {
    const deckTitle = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return deckTitle != null ? JSON.parse(deckTitle)[id] : null;
  } catch (e) {
    console.warn("Error getDeck!", e);
  }
  console.log(" getDeck Done.");
};

//  saveDeckTitle: take in a single (title) argument and add it to the decks.

export const saveDeckTitle = async (title) => {
  try {
    // merge [title] into saved DECKS_STORAGE_KEY
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (err) {
    console.warn("Error saveDeckTitle!", e);
  }

  console.log(" saveDeckTitle Done.");
};

/* 
 addCardToDeck:  take in two arguments, (title) and (card),
 and will add the card to the list of questions for the deck with the associated title.
 */
export const _addCardToDeck = async (title, card) => {
  try {
    const deck = await getDeck(title);
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (err) {
    console.warn("Error _addCardToDeck!", err);
    console.log(questions);
  }

  console.log(" _addCardToDeck Done.");
};
// Remove Deck
export const _removeDeck = async (key) => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(decks);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Error removeDeck!", e);
  }

  console.log("removeDeck Done.");
};
