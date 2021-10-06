import { SET_RESULT_CARDS, ResultType } from './ResultsPageTypes';

export const setResultCards = (arr: ResultType) => ({
  type: SET_RESULT_CARDS,
  payload: arr,
});
