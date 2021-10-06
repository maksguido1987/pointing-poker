import { ILobbySettingsState, TSettings } from './SettingsSectionActions';

const lobbySettingsState: ILobbySettingsState = {
  scramMasterAsPlayer: true,
  timerNeeded: true,
  coffeeCardNeeded: true,
  questionCardNeeded: false,
  sequenceType: 'Fibonacci',
};

export const lobbySettingsReducer = (state = lobbySettingsState, action: TSettings) => {
  switch (action.type) {
    case 'SET_SCRAM_MASTER_ROLE':
      return {
        ...state,
        scramMasterAsPlayer: action.payload as boolean,
      };
    case 'SET_TIMER':
      return {
        ...state,
        timerNeeded: action.payload as boolean,
      };
    case 'SET_COFFEE_CARD':
      return {
        ...state,
        coffeeCardNeeded: action.payload as boolean,
      };
    case 'SET_QUESTION_CARD':
      return {
        ...state,
        questionCardNeeded: action.payload as boolean,
      };
    case 'SET_SEQUENCE_TYPE':
      return {
        ...state,
        sequenceType: action.payload as string,
      };
    default:
      return state;
  }
};
