import { IMsg } from '../../types/interfaces';

export interface IChatState {
  msgs: IMsg[];
  isOpen: boolean;
}
export interface IActionSetAllMsgs {
  type: 'SET_ALL_MESSAGES';
  payload: IMsg[];
}

export interface IActionSetMsg {
  type: 'SET_MESSAGE';
  payload: IMsg;
}
