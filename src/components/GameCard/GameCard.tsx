import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
  sendCard,
  sendDeletedCard,
  sendIsUserCanceledCard,
  sendIsUserSelectedCard,
} from '../../sockets/SocketsAPI';
import { IGameCardProps } from '../../types/interfaces';
import { StyledGameCard } from './StyledGameCard';

const GameCard: FC<IGameCardProps> = ({
  isStats,
  ID,
  type,
  content,
  isStatisticSection,
  choseCard,
  setChoseCard,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [flippedClass, setFlippedClass] = useState(false);
  const stats = useSelector(
    (store: RootState) => store.card.store.find((el) => el.id === ID).stats,
  );
  const { gameId, currUserID, users, observersCount } = useSelector(
    (store: RootState) => store.initial,
  );
  const { timerNeeded, scramMasterAsPlayer } = useSelector((store: RootState) => store.settings);
  const { seconds, minutes } = useSelector((store: RootState) => store.timer);
  const playersCheckedCard = useSelector((store: RootState) => store.card.count);
  const allUsersLength = Object.keys(users).length;

  useEffect(() => {
    if (isSelected && seconds === 0 && minutes === 0) {
      setIsSelected(false);
      setChoseCard(1);
    }
    if (
      (isStats && seconds === 0 && minutes === 0) ||
      (!timerNeeded &&
        scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - observersCount) ||
      (!timerNeeded &&
        !scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - 1 - observersCount)
    ) {
      setFlippedClass(true);
    } else {
      setFlippedClass(false);
    }
  }, [seconds, scramMasterAsPlayer, playersCheckedCard, allUsersLength, timerNeeded]);

  const choiceCard = () => {
    if (choseCard === 1 && !isSelected) {
      sendIsUserSelectedCard(currUserID, gameId);
      setIsSelected(true);
      setChoseCard((prev) => prev + 1);
      sendCard(ID, gameId);
    }
    if (choseCard !== 1 && isSelected) {
      sendIsUserCanceledCard(currUserID, gameId);
      setIsSelected(false);
      setChoseCard((prev) => prev - 1);
      sendDeletedCard(ID, gameId);
    }
  };

  return (
    <>
      {stats > 0 || !isStats ? (
        <StyledGameCard
          selected={isSelected && !isStatisticSection}
          isStats={isStats}
          onClick={choiceCard}
        >
          <div className={`front ${flippedClass ? ' flipped-front' : 'front'}`}>
            {isStats && <div className="stats">{stats}%</div>}
            <div className="type-left">{type}</div>
            {typeof content === 'number' ? (
              <div className="number">{content}</div>
            ) : (
              <img src={content} alt="ico" />
            )}
            <div className="type-right">{type}</div>
          </div>
          <div className={` ${flippedClass ? 'back flipped-back' : 'back'}`} />
        </StyledGameCard>
      ) : null}
    </>
  );
};
export default GameCard;
