import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const HeaderStyled = styled.header`
  position: relative;
  padding: 0 0 0 64px;
  width: 100%;
  height: 70px;
  background-color: #ccc;
  background: linear-gradient(0deg, rgb(102, 153, 155) 29%, rgb(43, 58, 103) 29%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const IconStyled = styled.div`
  width: 78px;
  height: 78px;
  margin: 15px 0 0 0;
  background: url('../../assets/icons/logo.svg') center / cover no-repeat;
`;

export const MiniGameIcoStyled = styled.div`
  position: absolute;
  right: 20%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  top: 10px;
  background: url('../../assets/icons/a-ico.svg') center / cover no-repeat;
  transition: 0.3s;
  top: 10px;

  p {
    visibility: hidden;
    color: ${whiteColor};
    top: 32px;
    left: -208px;
    text-align: center;
    position: absolute;
    width: 210px;
    height: 90px;
    border-radius: 15px 0 15px 15px;
    padding: 5px;
    background-color: rgba(43, 72, 132, 0.6);
    transition: 1.5s;
  }

  &:hover {
    top: 7px;
    width: 35px;
    height: 35px;
    p {
      visibility: visible;
    }
  }
`;

export const ChatIcoStyled = styled.div`
  position: absolute;
  width: 45px;
  height: 30px;
  right: 5%;
  top: 10px;
  background: url('../../assets/icons/chat-ico.png') center / cover no-repeat;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
