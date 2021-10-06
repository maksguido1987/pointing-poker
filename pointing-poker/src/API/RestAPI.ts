import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { chat } from '../redux/ChatRedux/ChatActions';
import { IActionSetAllMsgs, IChatState } from '../redux/ChatRedux/ChatTypes';
import { initial, TInitial } from '../redux/InitialRedux/InitialActions';
import { connectToSocket, sendTitle } from '../sockets/SocketsAPI';
import { IUserInfo } from '../types/interfaces';

const { setCurrUserID, setGameId, setUser } = initial;

const URL = 'http://localhost:7001/api';

export const receiveAllMsgs =
  (gameId: string): ThunkAction<void, IChatState, unknown, IActionSetAllMsgs> =>
  async (
    dispatch: ThunkDispatch<IChatState, unknown, IActionSetAllMsgs>,
  ): Promise<IActionSetAllMsgs> => {
    const res = await fetch(`${URL}/messages/${gameId}`);
    const msgs = await res.json();
    return dispatch(chat.setAllMessage(msgs));
  };

export const getAllUsers =
  (gameId: string): ThunkAction<void, TInitial, unknown, TInitial> =>
  async (dispatch: ThunkDispatch<TInitial, unknown, TInitial>) => {
    const res = await fetch(`${URL}/users/${gameId}`);
    const users = await res.json();
    return users.map((user: IUserInfo) => dispatch(setUser(user)));
  };

export const createNewUser =
  (gameId: string, newUser: IUserInfo): ThunkAction<void, TInitial, unknown, TInitial> =>
  async (dispatch: ThunkDispatch<TInitial, unknown, TInitial>) => {
    const data = { newUser, gameId };
    const res = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const user = await res.json();
    dispatch(setCurrUserID(user._id));
    return connectToSocket(gameId, user);
  };

export const deleteUserById = async (userId: string) => {
  await fetch(`${URL}/users/${userId}`, {
    method: 'DELETE',
  });
};

export const createNewGame =
  (gameIndex: string, diler: IUserInfo): ThunkAction<void, TInitial, unknown, TInitial> =>
  async (dispatch: ThunkDispatch<TInitial, unknown, TInitial>) => {
    const data = { gameIndex };
    const res = await fetch(`${URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newGame = await res.json();
    const action = dispatch(setGameId(newGame._id));
    sendTitle(newGame._id, newGame.title);
    return dispatch(createNewUser(action.payload, diler));
  };
