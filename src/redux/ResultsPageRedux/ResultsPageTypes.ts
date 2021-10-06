export const SET_RESULT_CARDS = 'SET_RESULT_CARDS';

export type ResultType = {
  title: string;
  cardsResult: {
    id: string | number;
    stats?: number;
    content?: string | number;
  }[];
};

export interface IResultsState {
  store: ResultType[];
}

export type ActionTypeGameCard = {
  type: typeof SET_RESULT_CARDS;
  payload: ResultType;
};
