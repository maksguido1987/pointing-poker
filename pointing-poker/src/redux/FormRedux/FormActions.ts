import { IConnectForm, IIssueCard } from '../../components/Forms/FormTypes';
import { SET_AVATAR } from './ReduxFormTypes';

type TProperties<T> = T extends { [key: string]: infer U } ? U : never;
type TInferActions<T extends { [key: string]: (...args: any) => any }> = ReturnType<TProperties<T>>;

// ROLE PLAYERS

export type TSetRolePlayers = TInferActions<typeof setRolePlayers>;

export const setRolePlayers = {
  setConnectFormDialer: (payload: IConnectForm, avatar: string, userID: string) =>
    ({
      type: 'SET_DEALERS',
      payload: { ...payload, avatar, userID },
    } as const),

  setConnectFormPlayer: (payload: IConnectForm, avatar: string, userID: string) =>
    ({
      type: 'SET_PLAYERS',
      payload: { ...payload, avatar, userID },
    } as const),

  setConnectFormObserver: (payload: IConnectForm, avatar: string, userID: string) =>
    ({
      type: 'SET_OBSERVERS',
      payload: { ...payload, avatar, userID },
    } as const),

  setUpdatedPlayersState: (payload: string) =>
    ({
      type: 'UPDATE_PLAYERS_STATE',
      payload,
    } as const),
  setDeleteModal: (payload: { count: boolean; who: string; whom: string; deleteID: string }) =>
    ({
      type: 'SET_DELETE_MODAL',
      payload,
    } as const),
  setAcceptCount: (payload: number) =>
    ({
      type: 'SET_ACCEPT_COUNT',
      payload,
    } as const),
};

// AVATAR CONNECT FORM
export const setAvatar = (payload: string) => ({
  type: SET_AVATAR,
  payload,
});

// SHOW FORMS

export type TShowForms = TInferActions<typeof showForms>;

export const showForms = {
  showConnectForm: (payload: boolean) =>
    ({
      type: 'SHOW_CONNECT_FORM',
      payload,
    } as const),
  showIssuesForm: (payload: boolean) =>
    ({
      type: 'SHOW_ISSUES_FORM',
      payload,
    } as const),
};

// ISSUE FORM

export type TIssueForm = TInferActions<typeof issueForm>;

export const issueForm = {
  createIssueCard: (payload: IIssueCard, issueID: string, current: boolean, isCompleted: boolean) =>
    ({
      type: 'SET_ISSUE_DATA',
      payload: { ...payload, issueID, current, isCompleted },
    } as const),

  deleteIssueCard: (payload: string) =>
    ({
      type: 'DELETE_ISSUE_DATA',
      payload,
    } as const),

  toggleCurrentIssueCard: (payload: string) =>
    ({
      type: 'TOGGLE_CURRENT_ISSUE_CARD',
      payload,
    } as const),

  setCompletedIssueCard: (payload: { id: string; count: boolean }) =>
    ({
      type: 'SET_COMPLETED_ISSUE_CARD',
      payload,
    } as const),

  setElementIndex: (payload: number) =>
    ({
      type: 'SET_ELEM_INDEX',
      payload,
    } as const),

  renameIssueTitle: (payload: string, issueID: string) =>
    ({
      type: 'RENAME_ISSUE_TITLE',
      payload,
      issueID,
    } as const),

  renameIssuePriority: (payload: string, issueID: string) =>
    ({
      type: 'RENAME_ISSUE_PRIORITY',
      payload,
      issueID,
    } as const),

  restartIssues: (payload: boolean) =>
    ({
      type: 'RESTART_ISSUES',
      payload,
    } as const),
};
