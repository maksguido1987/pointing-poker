import { Link, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import LobbyHeaderSection from '../LobbyHeaderSection/LobbyHeaderSection';
import Timer from '../Timer/Timer';
import resultsIco from '../../assets/icons/results-ico.png';
import RoundResult from '../RoundResult/RoundResult';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import IssuesSection from '../IssuesSection/issuesSection';
import { Cards } from '../CardValuesSection/CardValuesSection';
import StatisticsSection from '../StatisticsSection/StatisticsSection';
import ScramMasterCard from '../ScramMasterSection/ScramMasterCard';
import { RootState } from '../../redux';
import { timerActions } from '../../redux/TimerRedux/TimerActions';
import { gameCard } from '../../redux/GameCardRedux/GameCardActions';
import { setResultCards } from '../../redux/ResultsPageRedux/ResultsPageActions';
import { StyledGamePage } from './StyledGamePage';
import {
  receivedCard,
  receivedDeletedCard,
  receivedDeletedIssues,
  receivedIsUserCanceledCard,
  receivedIsUserSelectedCard,
  receivedNextIssue,
  receivedRestartRound,
  receivedResults,
  receivedStartRound,
  sendCancelGame,
  sendDeletedUserToAll,
  sendNextIssue,
  sendRelocateResultPage,
  sendRestartRound,
  sendResults,
  sendStartRound,
} from '../../sockets/SocketsAPI';
import { IIssueCard } from '../Forms/FormTypes';
import { CardType } from '../../redux/GameCardRedux/GameCardTypes';
import { issueForm } from '../../redux/FormRedux/FormActions';
import { deleteUserById } from '../../API/RestAPI';

const GamePage = () => {
  const { setSeconds, setMinutes } = timerActions;
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const isRound = useSelector((store: RootState) => store.gameProcess.startRound);
  const { timerNeeded, scramMasterAsPlayer } = useSelector((store: RootState) => store.settings);
  const cardsArr = useSelector((store: RootState) => [...store.card.store]);
  const startTime = useSelector((store: RootState) => store.timer.startTime);
  const { isPlayer, isDialer, isObserver } = useSelector((store: RootState) => store.personStatus);
  const { issueCards, elemIndex } = useSelector((state: RootState) => state.issueFormData);
  const history = useHistory();
  const location = useLocation().pathname;
  const { currUserID, users, gameId } = useSelector((store: RootState) => store.initial);

  useEffect(() => {
    if (location === '/game' && users[currUserID] === undefined) {
      history.push('/');
      window.location.reload();
      alert('Sorry, you were excluded from the game!');
    }
  }, [location, Object.keys(users).length, location]);

  const startRound = () => sendStartRound(gameId);
  const restartRound = () => {
    sendRestartRound(issueCards, timerNeeded, gameId);
  };
  const nextIssue = () => sendNextIssue(cardsArr, issueCards, elemIndex, gameId);
  const setResults = () => {
    sendResults(cardsArr, issueCards, elemIndex, gameId);
    sendRelocateResultPage(gameId);
  };

  const setStartedTime = () =>
    setTimeout(() => {
      dispatch(setMinutes(startTime[0]));
      dispatch(setSeconds(startTime[1]));
      issueCards.forEach((el: IIssueCard) => {
        if (el.current && el.isCompleted) {
          dispatch(issueForm.setCompletedIssueCard({ id: el.issueID, count: false }));
        }
      });
    }, 0);

  const addCardsForResult = (cards: CardType[], IssueCards: IIssueCard[], index: number) => {
    const updatedCardsArr = () => cards.filter((el) => el.stats > 0);
    dispatch(
      setResultCards({
        title: IssueCards[index].issueTitle,
        cardsResult: updatedCardsArr().map((el) => ({
          id: el.id,
          stats: el.stats,
          content: el.content,
        })),
      }),
    );
    dispatch(gameCard.setInitialCards(true));
  };

  const cancelGame = () => {
    if (isDialer) sendCancelGame(gameId);
    else {
      deleteUserById(currUserID);
      sendDeletedUserToAll(currUserID, gameId);
      history.push('/');
      window.location.reload();
    }
  };

  useEffect(() => {
    receivedStartRound(dispatch);
    receivedRestartRound(setStartedTime, dispatch);
    receivedNextIssue(setStartedTime, addCardsForResult, dispatch);
    receivedDeletedIssues(dispatch);
    receivedResults(addCardsForResult);
    receivedCard(dispatch);
    receivedDeletedCard(dispatch);
    receivedIsUserCanceledCard(dispatch);
    receivedIsUserSelectedCard(dispatch);
  }, []);

  return (
    <StyledGamePage>
      <div className="flex-box">
        <section className="info">
          <LobbyHeaderSection />
          <img
            className="results-ico"
            onClick={() => setShowResults(true)}
            src={resultsIco}
            alt="results"
          />
          <div className="text">Scram master</div>
          <ScramMasterCard />
          <div className="scram-master-container">
            <div className="flex-box">
              <div className="stop-game-btn">
                <Link to="/" onClick={cancelGame}>
                  <Button
                    text={isDialer ? 'Stop Game' : 'Exit'}
                    colorBG={whiteColor}
                    color={blueColor}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="issues-container">
            <IssuesSection />
            <div className="timer-block">
              {timerNeeded && <Timer />}
              {isRound && isDialer ? (
                <>
                  <Button
                    text="Restart Round"
                    color={whiteColor}
                    onClick={restartRound}
                    colorBG={blueColor}
                  />

                  {issueCards[elemIndex].isCompleted && elemIndex + 1 < issueCards.length && (
                    <Button
                      text="Next ISSUE"
                      onClick={nextIssue}
                      color={whiteColor}
                      colorBG={blueColor}
                    />
                  )}
                  {issueCards[issueCards.length - 1].isCompleted && (
                    <Link to="/results" onClick={setResults}>
                      <Button
                        text="Results"
                        onClick={nextIssue}
                        color={whiteColor}
                        colorBG={blueColor}
                      />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  {issueCards.length > 0 && isDialer ? (
                    <Button
                      text="Run Round"
                      onClick={startRound}
                      color={whiteColor}
                      colorBG={blueColor}
                    />
                  ) : (
                    isDialer && <div className="no-issues">No Issues</div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        {showResults && <RoundResult setShowResults={setShowResults} />}
      </div>
      <section className="section">
        <StatisticsSection isStats />
      </section>
      {((isRound && isPlayer) || (isRound && scramMasterAsPlayer)) && !isObserver && (
        <section className="section">
          <Cards isStats={false} />
        </section>
      )}
    </StyledGamePage>
  );
};

export default GamePage;
