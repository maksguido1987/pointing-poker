import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

interface Iprops {
  checked: boolean;
}

export const StyleSwitcher = styled.div<Iprops>`
  position: relative;
  width: 55px;
  height: 30px;

  .switcher-input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  label {
    opacity: 1;
    width: 0;
    height: 0;
  }

  span {
    right: 0;
    position: absolute;
    cursor: pointer;
    width: 60px;
    height: 30px;
    background: ${({ checked }) => (checked ? '#60dabf' : '#c4c4c4')};
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: 0.5s;

    &::before {
      transform: ${({ checked }) => (checked ? 'translateX(-30px)' : 'translateX(0px)')};

      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${whiteColor};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      top: 5px;
      right: 5px;
      transition: 0.7s;
    }
  }
`;
