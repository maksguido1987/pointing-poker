import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledTimer = styled.div`
  display: flex;
  width: 200px;
  height: 80px;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 5px;
  background: ${whiteColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  section {
    position: relative;

    &:hover > .plus-btn {
      transition: 0.5s;
      opacity: 1;
    }

    &:hover > .minus-btn {
      transition: 0.5s;
      opacity: 1;
    }
  }

  div {
    font-weight: bold;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }
  .plus-btn,
  .minus-btn {
    opacity: 0;
    position: absolute;
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    transition: 0.2s;
    border-radius: 5px;
    bottom: -15px;
    right: 5px;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #60dabf;
    }
    &::after {
      content: '-';
    }
  }

  .plus-btn {
    left: 5px;
    &::after {
      content: '+';
    }
  }

  input {
    pointer-events: visible;
    text-align: center;
    appearance: none;
    font-size: 42px;
    width: 75px;
    height: 55px;
    outline: none;
    border: none;
    box-shadow: inset 0 2px 3px -1px grey;
    border-radius: 5px;
    cursor: inherit;
  }

  .points {
    margin: 13px 0 0 0;
    font-size: 42px;
  }
`;
