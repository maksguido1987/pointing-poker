import { TIssueForm, TSetRolePlayers, TShowForms } from './FormActions';
import {
  IAvatar,
  SET_AVATAR,
  IInitialStateIssueCards,
  IInitialStatePlayers,
} from './ReduxFormTypes';

// SHOW FORMS
const showFormsState = {
  isConnectForm: false,
  isIssuesForm: false,
};

export const showFormsReducer = (state = showFormsState, action: TShowForms) => {
  switch (action.type) {
    case 'SHOW_CONNECT_FORM':
      return {
        ...state,
        isConnectForm: action.payload,
      };
    case 'SHOW_ISSUES_FORM':
      return {
        ...state,
        isIssuesForm: action.payload,
      };
    default:
      return state;
  }
};

// AVATAR CONNECT FORM
const initialAvatar = {
  avatar: '',
};

export const connectAvatarReducer = (state = initialAvatar, action: IAvatar) => {
  switch (action.type) {
    case SET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};

// CONNECT FORM
const connectFormState: IInitialStatePlayers = {
  userDealer: {
    userID: '',
    firstName: '',
    lastName: '',
    job: '',
    avatar: '',
    session: '',
  },
  isDeleteModal: {
    count: false,
    who: '',
    whom: '',
    deleteID: '',
  },
  acceptDeleteUserCount: 0,
  userPlayers: [],
  userObservers: [],
};

export const connectFormDataReducer = (state = connectFormState, action: TSetRolePlayers) => {
  switch (action.type) {
    case 'SET_DEALERS':
      return {
        ...state,
        userDealer: action.payload,
      };
    case 'SET_PLAYERS':
      return {
        ...state,
        userPlayers: [...state.userPlayers, action.payload],
      };
    case 'UPDATE_PLAYERS_STATE':
      return {
        ...state,
        userPlayers: [...state.userPlayers.filter((el) => el.userID !== action.payload)],
      };
    case 'SET_DELETE_MODAL':
      return {
        ...state,
        isDeleteModal: {
          count: action.payload.count,
          who: action.payload.who,
          whom: action.payload.whom,
          deleteID: action.payload.deleteID,
        },
      };
    case 'SET_ACCEPT_COUNT':
      return {
        ...state,
        acceptDeleteUserCount: action.payload === 0 ? 0 : state.acceptDeleteUserCount + 1,
      };
    case 'SET_OBSERVERS':
      return {
        ...state,
        userObservers: [...state.userObservers, action.payload],
      };
    default:
      return state;
  }
};

// ISSUE FORM
const issueFormState: IInitialStateIssueCards = {
  elemIndex: 0,
  issueCards: [],
};

export const issueFormDataReducer = (state = issueFormState, action: TIssueForm) => {
  const { issueCards } = state;
  const issueIndex = issueCards.findIndex(({ issueID }) => issueID === action.payload);

  switch (action.type) {
    case 'SET_ISSUE_DATA':
      return {
        ...state,
        issueCards: [...state.issueCards, action.payload],
      };
    case 'DELETE_ISSUE_DATA':
      return {
        ...state,
        issueCards: [
          ...state.issueCards.slice(0, issueIndex),
          ...state.issueCards.slice(issueIndex + 1),
        ],
      };
    case 'TOGGLE_CURRENT_ISSUE_CARD':
      issueCards.map((card) =>
        card.issueID !== action.payload ? (card.current = false) : (card.current = true),
      );
      return {
        ...state,
        issueCards: [...state.issueCards],
      };
    case 'SET_COMPLETED_ISSUE_CARD':
      issueCards.forEach((card) => {
        if (card.issueID === action.payload.id) card.isCompleted = action.payload.count;
      });
      return {
        ...state,
        issueCards: [...state.issueCards],
      };
    case 'SET_ELEM_INDEX':
      return {
        ...state,
        elemIndex: action.payload,
      };
    case 'RENAME_ISSUE_TITLE':
      issueCards.forEach((card) => {
        if (card.issueID === action.issueID) {
          card.issueTitle = action.payload;
        }
      });
      return {
        ...state,
        issueCards: [...state.issueCards],
      };
    case 'RENAME_ISSUE_PRIORITY':
      issueCards.forEach((card) => {
        if (card.issueID === action.issueID) {
          card.issuePriority = action.payload;
        }
      });
      return {
        ...state,
        issueCards: [...state.issueCards],
      };
    case 'RESTART_ISSUES':
      return {
        ...state,
        elemIndex: action.payload && 0,
        issueCards: action.payload && [],
      };
    default:
      return state;
  }
};
