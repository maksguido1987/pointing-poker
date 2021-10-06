import { IMsg } from '../../types/interfaces';
import { TChat } from './ChatActions';
import { IChatState } from './ChatTypes';

const chatState: IChatState = {
  msgs: [],
  isOpen: false,
};

export const chatReducer = (state = chatState, action: TChat) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        msgs: [...state.msgs, action.payload as IMsg],
      };
    case 'SET_OPEN_CHAT':
      return {
        ...state,
        isOpen: action.payload,
      };
    case 'SET_ALL_MESSAGES':
      return {
        ...state,
        msgs: action.payload,
      };
    default:
      return state;
  }
};
