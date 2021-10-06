import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledUserCardMini = styled.div`
  width: 230px;
  height: 70px;
  background-color: ${whiteColor};
  display: flex;
  padding: 7px 15px 0;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  .img-container {
  }
  .name-block {
    margin: 5px 0 0 15px;
    font-size: 18px;
    div {
      &::first-letter {
        text-transform: uppercase;
      }
    }
    .first-name {
      font-size: 21px;
    }
  }
`;
