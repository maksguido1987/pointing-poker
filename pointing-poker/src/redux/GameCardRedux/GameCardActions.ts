import { CardType } from './GameCardTypes';

type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

export type TGameCard = TInferActions<typeof gameCard>;

export const gameCard = {
  setGameCard: (card: CardType) =>
    ({
      type: 'SET_GAME_CARD',
      payload: card,
    } as const),

  setGameCardCount: (count: number) =>
    ({
      type: 'SET_GAME_CARD_COUNT',
      payload: count,
    } as const),

  setSequenceForCard: (sequence: string) =>
    ({
      type: 'SET_SEQUENCE_FOR_CARD',
      payload: sequence,
    } as const),

  setInitialCards: (count: boolean) =>
    ({
      type: 'SET_INITIAL_CARDS',
      payload: count,
    } as const),

  userIsSelectedCard: (count: { id: string; count: boolean }) =>
    ({
      type: 'USER_IS_SELECTED_CARD',
      payload: count,
    } as const),
};
