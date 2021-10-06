import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledDeleteUser = styled.div`
  width: 100%;
  max-width: 876px;
  min-height: 500px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${whiteColor};

  & .delete-user-title {
    font-weight: 700;
    font-size: 64px;
    text-align: center;
  }

  & .delete-user-text {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    & > span {
      color: #496a81;
    }
  }
`;
