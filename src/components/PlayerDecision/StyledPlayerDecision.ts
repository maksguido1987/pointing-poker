import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledPlayerDecision = styled.div`
  width: 120px;
  height: 70px;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 4px;
  background-color: ${whiteColor};
  margin-right: 15px;

  div {
    text-transform: uppercase;
    padding-top: 24px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
`;
