import { io } from 'socket.io-client';
import { History } from 'history';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { chat } from '../redux/ChatRedux/ChatActions';
import { IIssueCard } from '../components/Forms/FormTypes';
import { initial } from '../redux/InitialRedux/InitialActions';
import { IMsg, IUserInfo } from '../types/interfaces';
import { issueForm, setRolePlayers } from '../redux/FormRedux/FormActions';
import {
  ILobbySettingsState,
  settingsSection,
} from '../redux/SettingsSectionRedux/SettingsSectionActions';
import { timerActions, TimerStateTypes } from '../redux/TimerRedux/TimerActions';
import { gameCard } from '../redux/GameCardRedux/GameCardActions';
import { CardType } from '../redux/GameCardRedux/GameCardTypes';
import { IActionSetMsg, IChatState } from '../redux/ChatRedux/ChatTypes';

const { setInitialCards, setGameCardCount, setGameCard, userIsSelectedCard } = gameCard;
const { setUser, setRound } = initial;
const { setCoffeeCard, setQuestionCard, setScramMasterRole, setSequenceType, setTimer } =
  settingsSection;
const { setMinutes, setSeconds, setStartTime } = timerActions;

export const socket = io('wss://pointing-poker-server-v1.herokuapp.com');

export const connectToSocket = (roomId: string, user: IUserInfo) => {
  socket.emit('join-game', roomId, user);
};

export const sendMsgToAll = async (msg: IMsg) => {
  socket.emit('send-msg', msg);
};

export const receiveMsg =
  (): ThunkAction<void, IChatState, unknown, IActionSetMsg> =>
  (dispatch: ThunkDispatch<IChatState, unknown, IActionSetMsg>) =>
    socket.on('recieve-msg', (msg) => {
      dispatch(chat.setMessage(msg));
    });

export const joinedNotification = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('joined', (user: IUserInfo) => {
    dispatch(setUser(user));
  });
};

export const getInitialDataBySocket = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('get-prev-data', (users, gameTitle) => {
    users.map((user: IUserInfo) => dispatch(setUser(user)));
    dispatch(initial.setGameTitle(gameTitle));
  });
};

export const sendTitle = (gameId: string, title: string) => {
  socket.emit('set-title', gameId, title);
};
export const receiveTitle = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-title', (title) => {
    dispatch(initial.setGameTitle(title));
  });
};

export const sendIsObserver = (count: number, gameId: string) => {
  socket.emit('is-observer', count, gameId);
};
export const receiveIsObserver = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-is-observer', (count) => {
    dispatch(initial.setObserversCount(count));
  });
};

export const sendDeletedUserToAll = (userID: string, id: string) => {
  socket.emit('deleted-user', userID, id);
};
export const receivedDeletedUser = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-deleted-user', (userID) => {
    dispatch(initial.setDeletedUser(userID));
  });
};

export const sendSettingsToAll = (settings: ILobbySettingsState, id: string) => {
  socket.emit('game-settings', settings, id);
};
export const receivedSettings = (
  dispatch: ThunkDispatch<ILobbySettingsState, unknown, any>,
  history: History,
) => {
  socket.on('received-settings', (settings: ILobbySettingsState) => {
    dispatch(setScramMasterRole(settings.scramMasterAsPlayer));
    dispatch(setTimer(settings.timerNeeded));
    dispatch(setCoffeeCard(settings.coffeeCardNeeded));
    dispatch(setQuestionCard(settings.questionCardNeeded));
    dispatch(setSequenceType(settings.sequenceType));
    history.push('/game');
  });
};

export const sendTimerToAll = (time: TimerStateTypes, id: string) => {
  socket.emit('set-timer', time, id);
};
export const receivedTimer = (dispatch: ThunkDispatch<TimerStateTypes, unknown, any>) => {
  socket.on('received-timer', (time: TimerStateTypes) => {
    dispatch(setMinutes(time.minutes));
    dispatch(setSeconds(time.seconds));
    dispatch(setStartTime([time.minutes, time.seconds]));
  });
};

export const sendIssuesToAll = (issues: IIssueCard, id: string) => {
  socket.emit('set-issues', issues, id);
};
export const receivedIssues = (dispatch: ThunkDispatch<IIssueCard, unknown, any>) => {
  socket.on('received-issues', (issues: IIssueCard) => {
    dispatch(issueForm.createIssueCard(issues, issues.issueTitle, false, false));
  });
};

export const sendDeletedIssuesToAll = (issueID: string, id: string) => {
  socket.emit('set-deleted-issues', issueID, id);
};
export const receivedDeletedIssues = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-deleted-issues', (issueID: string) => {
    dispatch(issueForm.deleteIssueCard(issueID));
  });
};

export const sendRenameIssueToAll = (data: any, issueID: string, id: string) => {
  socket.emit('send-rename-issues', data, issueID, id);
};
export const receivedRenameIssues = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-rename-issues', (data, issueID) => {
    dispatch(issueForm.renameIssueTitle(data.issueTitle, issueID));
    dispatch(issueForm.renameIssuePriority(data.issuePriority, issueID));
  });
};

export const sendRelocateResultPage = (id: string) => {
  socket.emit('relocate-result-page', id);
};
export const receivedRelocateResultPage = (history: History) => {
  socket.on('received-relocate-result-page', () => {
    history.push('/results');
  });
};

export const sendStartRound = (id: string) => {
  socket.emit('round', id);
};
export const receivedStartRound = (dispatch: ThunkDispatch<boolean, unknown, any>) => {
  socket.on('received-round', () => {
    dispatch(setRound(true));
  });
};

export const sendRestartRound = (issueCards: IIssueCard[], timer: boolean, id: string) => {
  socket.emit('restart-round', issueCards, timer, id);
};
export const receivedRestartRound = (
  setStartedTime: () => void,
  dispatch: ThunkDispatch<any, unknown, any>,
) => {
  socket.on('received-restart-round', (issueCards: IIssueCard[], timer) => {
    setStartedTime();
    if (!timer) {
      issueCards.forEach((el: IIssueCard) => {
        if (el.current && el.isCompleted) {
          dispatch(issueForm.setCompletedIssueCard({ id: el.issueID, count: false }));
        }
      });
    }
    dispatch(setRound(false));
    dispatch(setInitialCards(true));
  });
};

export const sendNextIssue = (
  cardsArr: CardType[],
  issueCards: IIssueCard[],
  elemIndex: number,
  id: string,
) => {
  socket.emit('next-issue', cardsArr, issueCards, elemIndex, id);
};
export const receivedNextIssue = (
  setStartedTime: () => void,
  addCardsForResult: (cards: CardType[], IssueCards: IIssueCard[], index: number) => void,
  dispatch: ThunkDispatch<any, unknown, any>,
) => {
  socket.on('received-next-issue', (cards, issueCards, elemIndex) => {
    setStartedTime();
    dispatch(setRound(false));
    dispatch(issueForm.setElementIndex(elemIndex + 1));
    addCardsForResult(cards, issueCards, elemIndex);
  });
};

export const sendResults = (
  cardsArr: CardType[],
  issueCards: IIssueCard[],
  elemIndex: number,
  id: string,
) => {
  socket.emit('results', cardsArr, issueCards, elemIndex, id);
};
export const receivedResults = (
  addCardsForResult: (cards: CardType[], IssueCards: IIssueCard[], index: number) => void,
) => {
  socket.on('received-results', (cards, issueCards, elemIndex) => {
    if (elemIndex + 1 < issueCards.length) addCardsForResult(cards, issueCards, elemIndex);
  });
};

export const sendCard = (cardID: string | number, id: string) => {
  socket.emit('card', cardID, id);
};
export const receivedCard = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-card', (cardID) => {
    dispatch(setGameCardCount(1));
    dispatch(
      setGameCard({
        id: cardID,
        chosen: 1,
      }),
    );
  });
};

export const sendDeletedCard = (cardID: string | number, id: string) => {
  socket.emit('card-deleted', cardID, id);
};
export const receivedDeletedCard = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-card-deleted', (cardID) => {
    dispatch(setGameCardCount(-1));
    dispatch(
      setGameCard({
        id: cardID,
        chosen: -1,
      }),
    );
  });
};

export const sendIsUserSelectedCard = (userID: string, id: string) => {
  socket.emit('is-user-selected-card', userID, id);
};
export const receivedIsUserSelectedCard = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-is-user-selected-card', (userID) => {
    dispatch(userIsSelectedCard({ id: userID, count: true }));
  });
};

export const sendIsUserCanceledCard = (userID: string, id: string) => {
  socket.emit('is-user-canceled-card', userID, id);
};
export const receivedIsUserCanceledCard = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-is-user-canceled-card', (userID) => {
    dispatch(userIsSelectedCard({ id: userID, count: false }));
  });
};

export const sendCancelGame = (id: string) => {
  socket.emit('cancel-game', id);
};
export const receivedCancelGame = (history: History) => {
  socket.on('received-cancel-game', () => {
    history.push('/');
    window.location.reload();
    alert('Session was closed!');
  });
};

export const sendOpenDeleteFormToAll = (who: string, whom: string, userID: string, id: string) => {
  socket.emit('delete-form', who, whom, userID, id);
};
export const receivedOpenDeleteForm = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-delete-form', (who, whom, deleteID) => {
    dispatch(setRolePlayers.setDeleteModal({ count: true, who, whom, deleteID }));
  });
};

export const sendChoiceForDeleteToAll = (id: string) => {
  socket.emit('delete-choice', id);
};
export const receivedChoiceForDelete = (dispatch: ThunkDispatch<any, unknown, any>) => {
  socket.on('received-delete-choice', () => {
    dispatch(setRolePlayers.setAcceptCount(1));
  });
};
