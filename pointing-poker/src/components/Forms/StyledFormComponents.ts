import styled from 'styled-components';
import { blueColor } from '../GlobalStyle/StyledGlobal';
import { IInputProps, ILabelProps } from './FormTypes';

export const StyledConnectWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(196, 196, 196, 0.6);

  .connect-form-wrapper {
    padding: 0 0 80px 30px;

    @media (max-width: 700px) {
      padding: 0 0 40px 15px;
    }
  }

  .connect-buttons-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyledLabel = styled.label<ILabelProps>`
  display: ${({ display }) => display || 'block'};
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '467px'};
  font-weight: 700;
  padding: ${({ padding }) => padding || '0 0 20px 0'};

  &:last-child {
    margin: 0;
  }

  @media (max-width: 700px) {
    font-size: 18px;
    margin: 0 0 10px 0;
  }
`;

export const StyledInput = styled.input<IInputProps>`
  display: block;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '467px'};
  height: 47px;
  padding: 0 0 0 15px;
  font-size: 24px;
  font-weight: 500;
  border: 1px solid ${blueColor};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({ borderRadius }) => borderRadius || '0px 0px 0px 10px'};
  outline: none;
  margin: ${({ margin }) => margin || '0 0 10px 0'};

  &:focus {
    box-shadow: inset 0 0 4px black;
  }

  @media (max-width: 700px) {
    font-size: 19px;
    height: 40px;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  max-width: 267px;
  height: 47px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-size: 24px;
  font-weight: 700;
  outline: none;
`;
