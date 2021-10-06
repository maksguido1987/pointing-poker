type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

export type TSetRolePlayers = TInferActions<typeof actions>;

export const actions = {
  setDealerStatus: (payload: boolean) =>
    ({
      type: 'SET_DIALER_STATUS',
      payload,
    } as const),

  setObserverStatus: (payload: boolean) =>
    ({
      type: 'SET_OBSERVER_STATUS',
      payload,
    } as const),

  setPlayerStatus: (payload: boolean) =>
    ({
      type: 'SET_PLAYER_STATUS',
      payload,
    } as const),
};
