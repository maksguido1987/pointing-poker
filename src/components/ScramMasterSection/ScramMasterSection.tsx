import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '../Button/Button';
import { StyledScramMasterSection } from './StyledScramMasterSection';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import { RootState } from '../../redux';
import ScramMasterCard from './ScramMasterCard';
import { deleteUserById, getAllUsers } from '../../API/RestAPI';
import {
  sendCancelGame,
  sendDeletedUserToAll,
  sendSettingsToAll,
  sendTimerToAll,
} from '../../sockets/SocketsAPI';
import { timerActions } from '../../redux/TimerRedux/TimerActions';

const ScramMasterSection = () => {
  const { gameId, currUserID } = useSelector((store: RootState) => store.initial);
  const { isDialer } = useSelector((store: RootState) => store.personStatus);
  const { scramMasterAsPlayer, timerNeeded, coffeeCardNeeded, questionCardNeeded, sequenceType } =
    useSelector((store: RootState) => store.settings);
  const history = useHistory();
  const dispatch = useDispatch();
  const { minutes, seconds } = useSelector((store: RootState) => store.timer);

  const startGame = () => {
    if (isDialer) dispatch(timerActions.setStartTime([minutes, seconds]));
    sendTimerToAll({ minutes, seconds }, gameId);
    sendSettingsToAll(
      {
        scramMasterAsPlayer,
        timerNeeded,
        coffeeCardNeeded,
        questionCardNeeded,
        sequenceType,
      },
      gameId,
    );
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

  const EntryKeyField = ({ gameKey }: { gameKey: string }) => {
    return <input className="scram-master-input" type="text" defaultValue={gameKey} />;
  };

  const copyGameID = () => {
    const link = document.querySelector('.scram-master-input') as HTMLInputElement;
    window.navigator.clipboard.writeText(link.value);
  };

  useEffect(() => {
    getAllUsers(gameId);
  }, []);

  return (
    <StyledScramMasterSection>
      <div className="text">Scram master</div>
      <ScramMasterCard />
      {isDialer && (
        <>
          <div className="key-text">Key to lobby:</div>
          <div className="flex-box">
            <EntryKeyField gameKey={gameId} />
            <Button colorBG={blueColor} color={whiteColor} text="Copy" onClick={copyGameID} />
          </div>
        </>
      )}
      <div className="flex-box-2">
        {isDialer && (
          <Link to="/game">
            <Button onClick={startGame} colorBG={blueColor} color={whiteColor} text="Start Game" />
          </Link>
        )}
        <Link to="/">
          <Button
            onClick={cancelGame}
            colorBG={whiteColor}
            color={blueColor}
            text={isDialer ? 'Cancel Game' : 'Exit'}
          />
        </Link>
      </div>
    </StyledScramMasterSection>
  );
};

export default ScramMasterSection;
