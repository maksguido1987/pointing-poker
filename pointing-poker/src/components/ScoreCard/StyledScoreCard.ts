import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledScoreCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px 22px;
  width: 500px;
  height: 120px;
  background: ${whiteColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  & > .score-card-name {
    font-size: 40px;
    font-weight: bold;
  }
`;
