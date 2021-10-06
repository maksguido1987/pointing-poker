import styled from 'styled-components';
import { blueColor, beigeColor } from '../GlobalStyle/StyledGlobal';

export const StyledResultsPage = styled.div`
  text-align: center;
  width: 70%;
  margin: 0 0 50px 50%;
  padding-top: 20px;
  transform: translateX(-50%);

  .title {
    letter-spacing: 1px;
    text-align: left;
    margin: 50px 0 0 50px;
    font-size: 26px;
    font-weight: bold;
  }

  .cards-section {
    display: flex;
    flex-wrap: wrap;
    pointer-events: none;
  }

  .card {
    margin: 0 5px;
  }

  .stats {
    color: ${blueColor};
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    text-shadow: 0px 0px 5px ${beigeColor};
  }

  .excel-btn {
    button {
      margin-top: 100px;
      width: 250px;
    }
  }
`;
