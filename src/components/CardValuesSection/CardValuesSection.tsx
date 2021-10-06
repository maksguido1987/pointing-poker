import { useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleCardValuesSection } from './StyledCardValues';
import coffeeIco from '../../assets/icons/coffee-ico.svg';
import questionIco from '../../assets/icons/question-ico.svg';
import { RootState } from '../../redux';
import GameCard from '../GameCard/GameCard';
import { IGameCardsProps } from '../../types/interfaces';

const fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34];
const authorSequence = [1, 2, 3, 6, 10, 20, 30, 40];

export const Cards: FC<IGameCardsProps> = ({ isStats, isStatisticSection }) => {
  const [isHide, setIsHide] = useState(false);
  const [choseCard, setChoseCard] = useState(1);

  const location = useLocation();
  const settings = useSelector((store: RootState) => store.settings);
  const { minutes, seconds } = useSelector((store: RootState) => store.timer);
  const { timerNeeded, scramMasterAsPlayer } = useSelector((store: RootState) => store.settings);
  const playersCheckedCard = useSelector((store: RootState) => store.card.count);
  const { users, observersCount } = useSelector((store: RootState) => store.initial);
  const allUsersLength = Object.keys(users).length;

  useEffect(() => {
    if (
      location.pathname === '/settings' ||
      (minutes === 0 && seconds === 0) ||
      (!timerNeeded &&
        scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - observersCount) ||
      (!timerNeeded &&
        !scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - 1 - observersCount)
    ) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
  }, [location.pathname, minutes, seconds, playersCheckedCard]);

  return (
    <StyleCardValuesSection events={isHide}>
      <div className="flex-box">
        {settings.coffeeCardNeeded && (
          <GameCard
            isStatisticSection={isStatisticSection}
            isStats={isStats}
            ID="Coffee"
            type="Coffee"
            content={coffeeIco}
            choseCard={choseCard}
            setChoseCard={setChoseCard}
          />
        )}
        {settings.sequenceType === 'Fibonacci'
          ? fibonacciSequence.map((el, i) => (
              <GameCard
                isStatisticSection={isStatisticSection}
                isStats={isStats}
                ID={i + 1}
                key={i}
                type="SP"
                content={el}
                choseCard={choseCard}
                setChoseCard={setChoseCard}
              />
            ))
          : authorSequence.map((el, i) => (
              <GameCard
                isStatisticSection={isStatisticSection}
                isStats={isStats}
                ID={i + 1}
                key={i}
                type="SP"
                content={el}
                choseCard={choseCard}
                setChoseCard={setChoseCard}
              />
            ))}
        {settings.questionCardNeeded && (
          <GameCard
            isStatisticSection={isStatisticSection}
            isStats={isStats}
            ID="Unknown"
            type="Unknown"
            content={questionIco}
            choseCard={choseCard}
            setChoseCard={setChoseCard}
          />
        )}
      </div>
    </StyleCardValuesSection>
  );
};

const CardValuesSection = () => {
  return (
    <StyleCardValuesSection>
      <div className="text">Card Values:</div>
      <Cards isStats={false} />
    </StyleCardValuesSection>
  );
};

export default CardValuesSection;
