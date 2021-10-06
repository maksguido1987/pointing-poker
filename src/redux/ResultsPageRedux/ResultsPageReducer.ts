import { SET_RESULT_CARDS, ActionTypeGameCard, IResultsState } from './ResultsPageTypes';

const cardsState: IResultsState = {
  store: [],
};

export const resultsPageReducer = (state = cardsState, action: ActionTypeGameCard) => {
  switch (action.type) {
    case SET_RESULT_CARDS:
      return {
        ...state,
        store: [...state.store, action.payload],
      };
    default:
      return state;
  }
};
