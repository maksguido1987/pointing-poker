import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyleMainPage = styled.div`
  padding: 70px 30px 0 30px;
  .header {
    position: relative;
    margin: 0 auto;
    width: 360px;
    height: 200px;
    @media (max-width: 700px) {
      width: 270px;
    }
  }
  img {
    position: absolute;
    left: -110px;
    @media (max-width: 700px) {
      width: 70px;
      left: -80px;
    }
  }
  p {
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    &:first-child {
      padding-top: 10px;
    }
    @media (max-width: 700px) {
      font-size: 20px;
      line-height: 24px;
    }
  }
  .strip {
    border: 1px solid ${whiteColor};
    border-radius: 5px;
    box-shadow: 0px 3px 5px 3px rgba(0, 0, 0, 0.25);
  }
  .poker,
  .planning {
    font-weight: bold;
    font-size: 70px;
    @media (max-width: 700px) {
      font-size: 50px;
    }
  }
  .connect__text {
    margin-bottom: 20px;
  }
  .planning {
    text-align: right;
  }
  .body {
    margin-top: 40px;
    max-width: 520px;
    width: 100%;
    div:first-child,
    div:nth-child(3) {
      font-weight: bold;
      font-size: 48px;
      line-height: 56px;
      color: #66999b;
      margin-bottom: 30px;
      @media (max-width: 700px) {
        font-size: 40px;
      }
    }
    div:nth-child(3) {
      margin-top: 20px;
    }
  }
  .flex-box {
    display: flex;
    justify-content: space-between;
  }
  .started-page-url {
    width: 100%;
    font-size: 22px;
    padding: 0 10px;
    outline: none;
    border: 1px solid black;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 0px 10px;
  }
`;
