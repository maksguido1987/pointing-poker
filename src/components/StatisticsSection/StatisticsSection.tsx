import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { IStatisticsSectionProps } from '../../types/interfaces';
import { Cards } from '../CardValuesSection/CardValuesSection';
import { StyledStatisticsSection } from './StyledStatisticsSection';

const StatisticsSection: FC<IStatisticsSectionProps> = ({ isStats }) => {
  const { minutes, seconds } = useSelector((store: RootState) => store.timer);
  const { timerNeeded, scramMasterAsPlayer } = useSelector((store: RootState) => store.settings);
  const playersCheckedCard = useSelector((store: RootState) => store.card.count);
  const { users, observersCount } = useSelector((store: RootState) => store.initial);
  const allUsersLength = Object.keys(users).length;

  const ResultsSection = () => (
    <StyledStatisticsSection>
      <div className="top-text">Results:</div>
      <div className="card-container">
        <Cards isStatisticSection isStats={isStats} />
      </div>
    </StyledStatisticsSection>
  );

  return (
    <>
      {timerNeeded && minutes === 0 && seconds === 0 && <ResultsSection />}
      {!timerNeeded &&
        scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - observersCount && <ResultsSection />}
      {!timerNeeded &&
        !scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - 1 - observersCount && <ResultsSection />}
    </>
  );
};

export default StatisticsSection;
