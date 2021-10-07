import { Dispatch, SetStateAction } from 'react';

export interface IMsg {
  _id?: string;
  game_id: string;
  user_id: string;
  text: string;
  time: string;
}

export interface IPlayerDecisionProps {
  decision: string;
}

export interface IChatMessageProps {
  users: IUsers;
  currUserID: string;
  msgData: IMsg;
}

export interface IStatisticsSectionProps {
  isStats: boolean;
}

export interface IRoundResultProps {
  setShowResults?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserInfo {
  _id?: string;
  game_id?: string;
  name: string;
  lastName: string;
  isDialer: Boolean;
  isObserver: Boolean;
  isPlayer: Boolean;
  job: string;
  avatar: string;
}

export interface IUsers {
  [key: string]: IUserInfo;
}

export interface ISwitcherProps {
  listener: (role: boolean) => {
    type: string;
    payload: boolean;
  };
  checked: boolean;
}

export interface IGameCardProps {
  type: string;
  content: string | number;
  ID: string | number;
  isStats: boolean;
  isStatisticSection?: boolean;
  choseCard?: number;
  setChoseCard?: React.Dispatch<React.SetStateAction<number>>;
}

export interface IDeleteUserProps {
  id: string;
  firstName: string;
  lastName: string;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInputComponentProps {
  setter: (count: number) => { type: string; payload: number };
  count: number;
  actualCount: number;
}

export interface IButtonProps {
  color: string;
  colorBG: string;
  text: string;
  mainPage?: boolean;
  borderRadius?: string;
  display?: string;
  onClick?: () => void;
}

export interface IGameCardsProps {
  isStats: boolean;
  isStatisticSection?: boolean;
}

export interface IChatInputProps {
  setMsg: Dispatch<SetStateAction<string>>;
  submitMsg: () => void;
  txtRef: React.LegacyRef<HTMLDivElement>;
}
