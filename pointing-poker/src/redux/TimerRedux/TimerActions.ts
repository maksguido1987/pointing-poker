type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

export type TTimer = TInferActions<typeof timerActions>;

export type TimerStateTypes = {
  startTime?: number[];
  seconds: number;
  minutes: number;
  fullSeconds?: number;
};

export const timerActions = {
  setSeconds: (count: number) =>
    ({
      type: 'SET_SECONDS',
      payload: count,
    } as const),
  setMinutes: (count: number) =>
    ({
      type: 'SET_MINUTES',
      payload: count,
    } as const),
  setFullSeconds: (count: number) =>
    ({
      type: 'SET_FULL_SECONDS',
      payload: count,
    } as const),
  setStartTime: (count: number[]) =>
    ({
      type: 'SET_START_TIME',
      payload: count,
    } as const),
};
