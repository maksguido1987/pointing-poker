import { IUsers } from '../../types/interfaces';
import { TInitial } from './InitialActions';

export interface InitialState {
  gameId: string;
  dealerId: string;
  currUserID: string;
  users: IUsers;
  observersCount: number;
  gameTitle: string;
}

const initialState: InitialState = {
  gameId: '',
  dealerId: '',
  currUserID: '',
  users: {},
  observersCount: 0,
  gameTitle: '',
};

export const initialReducer = (state = initialState, action: TInitial) => {
  switch (action.type) {
    case 'SET_CURR_USER_ID':
      return {
        ...state,
        currUserID: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        users: { ...state.users, [action.payload._id]: action.payload },
      };
    case 'SET_OBSERVERS_COUNT':
      return {
        ...state,
        observersCount: action.payload,
      };
    case 'SET_GAME_ID':
      return {
        ...state,
        gameId: action.payload,
      };
    case 'SET_GAME_TITLE':
      return {
        ...state,
        gameTitle: action.payload,
      };
    case 'SET_DILER_ID':
      return {
        ...state,
        dealerId: action.payload,
      };
    case 'SET_DELETED_USER':
      delete state.users[`${action.payload}`];
      return {
        ...state,
      };
    default:
      return state;
  }
};

const gameProcessState = {
  startRound: false,
  selectedCard: false,
  miniGame: false,
  check: [] as any[],
};
export const gameProcessReducer = (state = gameProcessState, action: TInitial) => {
  switch (action.type) {
    case 'SET_ROUND':
      return {
        ...state,
        startRound: action.payload,
      };
    case 'SET_MINI_GAME':
      return {
        ...state,
        miniGame: action.payload,
      };
    case 'SET_CHECK':
      return {
        ...state,
        check: [action.payload],
      };
    default:
      return state;
  }
};
