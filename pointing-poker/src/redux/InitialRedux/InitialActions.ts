import { IUserInfo } from '../../types/interfaces';

type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

export type TInitial = TInferActions<typeof initial>;

export const initial = {
  setCurrUserID: (id: string) =>
    ({
      type: 'SET_CURR_USER_ID',
      payload: id,
    } as const),
  setGameTitle: (gameTitle: string) =>
    ({
      type: 'SET_GAME_TITLE',
      payload: gameTitle,
    } as const),
  setObserversCount: (count: number) =>
    ({
      type: 'SET_OBSERVERS_COUNT',
      payload: count,
    } as const),
  setUser: (userInfo: IUserInfo) =>
    ({
      type: 'SET_USER',
      payload: userInfo,
    } as const),
  setGameId: (gameId: string) =>
    ({
      type: 'SET_GAME_ID',
      payload: gameId,
    } as const),

  setRound: (count: boolean) =>
    ({
      type: 'SET_ROUND',
      payload: count,
    } as const),

  setMiniGame: (count: boolean) =>
    ({
      type: 'SET_MINI_GAME',
      payload: count,
    } as const),

  setDilerId: (id: string) =>
    ({
      type: 'SET_DILER_ID',
      payload: id,
    } as const),
  setCheck: (payload: any) =>
    ({
      type: 'SET_CHECK',
      payload,
    } as const),
  setDeletedUser: (payload: string) =>
    ({
      type: 'SET_DELETED_USER',
      payload,
    } as const),
};
