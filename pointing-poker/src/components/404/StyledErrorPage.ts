import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledErrorPage = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-weight: 900;
  background-color: ${whiteColor};

  .error-text {
    color: red;
    font-size: 34px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .home {
    cursor: pointer;
    font-size: 21px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover {
      text-decoration: underline;
    }
  }
`;
