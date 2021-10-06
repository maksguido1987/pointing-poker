import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { chatReducer } from './ChatRedux/ChatReducer';
import { initialReducer, gameProcessReducer } from './InitialRedux/InitialReducer';
import { gameCardReducer } from './GameCardRedux/GameCardReducer';
import { lobbySettingsReducer } from './SettingsSectionRedux/SettingsSectionReducer';
import {
  connectAvatarReducer,
  connectFormDataReducer,
  issueFormDataReducer,
  showFormsReducer,
} from './FormRedux/FormReducers';
import { timerReducer } from './TimerRedux/TimerReducer';
import { resultsPageReducer } from './ResultsPageRedux/ResultsPageReducer';
import { gameStatusPersonReducer } from './RolesRedux/RolesReducers';

const rootReducer = combineReducers({
  personStatus: gameStatusPersonReducer,
  showForms: showFormsReducer,
  issueFormData: issueFormDataReducer,
  dataConnectForm: connectFormDataReducer,
  connectAvatar: connectAvatarReducer,
  settings: lobbySettingsReducer,
  initial: initialReducer,
  chat: chatReducer,
  card: gameCardReducer,
  timer: timerReducer,
  gameProcess: gameProcessReducer,
  results: resultsPageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
