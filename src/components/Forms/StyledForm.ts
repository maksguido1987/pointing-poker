import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';
import { IPopupWrapper } from './FormTypes';

export const StyledConnectForm = styled.form<IPopupWrapper>`
  width: 100%;
  max-width: 876px;
  background-color: ${whiteColor};
  padding: 15px;

  legend {
    width: 100%;
    max-width: 520px;
    color: #000;
    font-size: 64px;
    font-weight: 700;
    text-align: ${({ textAlign }) => textAlign};

    @media (max-width: 700px) {
      font-size: 42px;
      padding: 0 0 20px 15px;
    }
  }

  .input-file-wrapper {
    display: flex;
    width: 100%;
    max-width: 467px;
    padding: 20px 0 0 0;

    @media (max-width: 700px) {
      padding: 0 0 20px 15px;
    }
  }

  .legend-wrapper {
    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
    padding: ${({ padding }) => padding || '0 0 40px 30px'};
  }

  .switcher-wrapper {
    display: flex;
    align-items: center;
    font-family: Ruda;
    font-weight: 700;
    font-size: 24px;

    p {
      padding: 0 20px;
      width: 183px;
    }
  }

  .upload-label {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 47px;
    max-width: 276px;
    margin: 0 0 20px 0;
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 24px;
    cursor: pointer;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 0px 10px;

    @media (max-width: 700px) {
      font-size: 18px;
      height: 40px;
    }
  }

  .upload-input {
    opacity: 0;
    position: absolute;
    z-index: -1;
    overflow: hidden;
    width: 0.4px;
    height: 0.4px;
  }

  .error {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    line-height: 12px;
    color: red;
    padding: 0 0 10px 0;
  }
`;
