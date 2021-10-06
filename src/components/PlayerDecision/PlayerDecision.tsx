import { FC } from 'react';
import { IPlayerDecisionProps } from '../../types/interfaces';
import { StyledPlayerDecision } from './StyledPlayerDecision';

const PlayerDecision: FC<IPlayerDecisionProps> = ({ decision }) => {
  return (
    <StyledPlayerDecision>
      <div>{decision}</div>
    </StyledPlayerDecision>
  );
};

export default PlayerDecision;
