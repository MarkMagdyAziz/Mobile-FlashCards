import { actionTypes } from "../actions/index";
import { decks as initialState } from "../utils/_DATA";
// JavaScript: {
//     title: "JavaScript",
//     questions: [
//       {
//         question: "What is a closure?",
//         answer:
//           "The combination of a function and the lexical environment within which that function was declared.",
//       },
//     ],
//   },

// Use the initialState as a default value
export default function rootReducer(state = {}, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case actionTypes.RECEIVE_DECKS: {
      return {
        ...state,
        ...action.decks,
      };
    }
    case actionTypes.ADD_DECK:
      const { title } = action;
      // We need to return a new state object
      // that has all the existing state data
      // but has a new array for the `decks` field
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case actionTypes.REMOVE_DECK: {
      const { id } = action;
      //return state.filter((deck) => deck.deckId !== id);
      delete state[id];
      return {
        ...state,
      };
      // console.log(remainingDecks);
      /*
      delete state[id];
      return {
        ...state
      }
      */
      /*
      const { [id]: value, ...remainingDecks } = state;
       return remainingDecks;
       */
    }
    case actionTypes.ADD_CARD_TO_DECK:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card),
        },
      };
    case actionTypes.RESET_STORE:
      return initialState;
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
