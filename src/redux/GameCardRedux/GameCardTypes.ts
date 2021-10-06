export interface CardType {
  id: string | number;
  stats?: number;
  chosen?: number;
  content?: string | number;
}

export type TypeUserSelectedCard = { [key: string]: boolean };
export interface ICardState {
  userSelectedCard: TypeUserSelectedCard;
  count: number;
  store: CardType[];
}
