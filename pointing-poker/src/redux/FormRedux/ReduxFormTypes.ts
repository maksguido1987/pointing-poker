import { IConnectForm, IIssueCard } from '../../components/Forms/FormTypes';

export const SET_AVATAR = 'SET_AVATAR';

// CONNECT FORM
export interface IInitialStatePlayers {
  userDealer: IConnectForm;
  userPlayers: IConnectForm[];
  userObservers: IConnectForm[];
  isDeleteModal: { count: boolean; who: string; whom: string; deleteID: string };
  acceptDeleteUserCount: number;
}

// AVATAR CONNECT FORM
export interface IAvatar {
  type: typeof SET_AVATAR;
  payload: string;
}

// ISSUE FORM
export interface IInitialStateIssueCards {
  issueCards: IIssueCard[];
  elemIndex: number;
}
