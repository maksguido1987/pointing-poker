import { IMsg } from '../../types/interfaces';

type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

export type TChat = TInferActions<typeof chat>;

export const chat = {
  setMessage: (msg: IMsg) =>
    ({
      type: 'SET_MESSAGE',
      payload: msg,
    } as const),
  setAllMessage: (msgs: IMsg[]) =>
    ({
      type: 'SET_ALL_MESSAGES',
      payload: msgs,
    } as const),
  setOpenChat: (currState: boolean) =>
    ({
      type: 'SET_OPEN_CHAT',
      payload: currState,
    } as const),
};
