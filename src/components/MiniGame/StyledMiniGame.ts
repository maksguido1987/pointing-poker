import styled, { keyframes } from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

interface IStyledMiniGameProps {
  gameIsOpen: boolean;
}

export const StyledMiniGame = styled.div<IStyledMiniGameProps>`
  display: ${(props) => (props.gameIsOpen ? 'block' : 'none')};
  z-index: 10;
  position: absolute;
  top: 15%;
  left: 40%;
  width: 330px;
  height: 245px;
  border-radius: 10px 10px 5px 5px;
  box-shadow: inset 0 0 4px rgb(0 0 0 / 14%), inset 0 0px 0px rgb(0 0 0 / 28%);
  overflow: hidden;

  .header {
    border-radius: 10px 10px 0 0;
    border: 1px solid rgba(43, 58, 103, 0.9);
    z-index: 2;
    height: 50px;
    background-color: rgba(43, 58, 103, 0.9);
    cursor: grab;

    button {
      color: black;
      z-index: 5;
      margin: 10px 0 0 280px;
      width: 30px;
      height: 30px;
      outline: none;
      border: none;
      border-radius: 50%;
      box-shadow: 0px 0px 7px rgb(166, 213, 247);
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: ${whiteColor};
      }
      &::after {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        content: 'X';
      }
    }
  }

  .game-block {
    border: 1px solid #c5d0db;
    background-color: #e5ebf1;
    height: 195px;
    padding: 5px 15px 0;
  }

  .header-text {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    text-shadow: 0 0 5px #b79fff;
    margin-bottom: 15px;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: 0.2s;
    border-radius: 50%;
    color: ${whiteColor};
    &:hover {
      transform: scale(1.1);
    }
  }

  .refresh {
    width: 40px;
    height: 40px;
    background-color: transparent;
    img {
    }
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
  }

  .word-block {
    font-size: 33px;
    text-transform: uppercase;
    .word {
      color: #49155b;
      text-shadow: 0 0 5px ${whiteColor};
      text-align: center;
      width: 82%;
      margin-bottom: 15px;
    }
  }

  .input-block {
    input {
      height: 40px;
      width: 75%;
      outline: none;
      border: 1px solid #7c7496;
      border-radius: 5px;
      font-size: 25px;
      padding: 0 10px;
    }
    button {
      font-size: 18px;
      font-weight: bold;
      width: 40px;
      height: 40px;
      background: rgb(226, 140, 255);
      background: linear-gradient(
        270deg,
        rgba(226, 140, 255, 1) 0%,
        rgba(168, 165, 255, 1) 56%,
        rgba(72, 206, 255, 1) 100%
      );
    }
  }

  .answer {
    position: absolute;
    top: 95px;
    left: 20px;
    width: 235px;
    height: 50px;
    text-transform: uppercase;
    text-shadow: 0 0 5px ${whiteColor};
    text-align: center;
    font-size: 33px;
    background-color: #e5ebf1;
  }

  .answer-btn {
    margin-bottom: 10px;
    border-radius: 5px;
    width: 60px;
    height: 25px;
    background: rgb(226, 140, 255);
    background: linear-gradient(
      270deg,
      rgba(226, 140, 255, 1) 0%,
      rgba(168, 165, 255, 1) 56%,
      rgba(72, 206, 255, 1) 100%
    );
    &::after {
      content: 'Answer';
    }
  }

  .timer {
    position: absolute;
    top: 142px;
    left: 50%;
    color: rgb(72, 206, 255);
    text-shadow: 0 0 5px ${whiteColor};
    font-size: 22px;
    font-weight: bold;
    transform: translateX(-50%);
  }
`;

export const show = keyframes`  
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }

`;

export const StyledWin = styled.div`
  position: absolute;
  animation: ${show} 3.5s infinite;
  left: 43%;
  transform: translateX(-50%);
  top: 130px;
  width: 60px;
  height: 60px;
  background: url('../../assets/icons/check-true.png') center / cover no-repeat;
`;

export const StyledFail = styled.div`
  position: absolute;
  animation: ${show} 3s infinite;
  left: 43%;
  transform: translateX(-50%);
  top: 130px;
  width: 60px;
  height: 60px;
  background: url('../../assets/icons/check-false.png') center / cover no-repeat;
`;
