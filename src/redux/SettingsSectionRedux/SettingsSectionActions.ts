type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

export type TSettings = TInferActions<typeof settingsSection>;

export interface ILobbySettingsState {
  scramMasterAsPlayer: boolean;
  timerNeeded: boolean;
  coffeeCardNeeded: boolean;
  questionCardNeeded: boolean;
  sequenceType: string;
}

export type ActionColor = {
  about: boolean;
  home: boolean;
};

export const settingsSection = {
  setScramMasterRole: (role: boolean) =>
    ({
      type: 'SET_SCRAM_MASTER_ROLE',
      payload: role,
    } as const),
  setTimer: (count: boolean) =>
    ({
      type: 'SET_TIMER',
      payload: count,
    } as const),
  setCoffeeCard: (count: boolean) =>
    ({
      type: 'SET_COFFEE_CARD',
      payload: count,
    } as const),
  setQuestionCard: (count: boolean) =>
    ({
      type: 'SET_QUESTION_CARD',
      payload: count,
    } as const),
  setSequenceType: (sequence: string) =>
    ({
      type: 'SET_SEQUENCE_TYPE',
      payload: sequence,
    } as const),
};
