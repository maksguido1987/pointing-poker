import { FC } from 'react';
import { IButtonProps } from '../../types/interfaces';
import { StyleButton } from './StyledButton';

const Button: FC<IButtonProps> = ({ colorBG, text, color, mainPage, borderRadius, onClick }) => {
  return (
    <StyleButton
      onClick={onClick}
      color={color}
      colorBG={colorBG}
      mainPage={mainPage}
      borderRadius={borderRadius}
    >
      <button>{text}</button>
    </StyleButton>
  );
};

export default Button;
