import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';

interface IPropsAvatar {
  background?: string;
  width?: string;
  height?: string;
  mainPage?: boolean;
}

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((w) => w.slice(0, 1))
    .join('')
    .toUpperCase();
};

export const ImageContainer = styled.div<IPropsAvatar>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '55px'};
  height: ${({ height }) => height || '55px'};
  border-radius: 50%;
  background: ${(props) => (props.mainPage ? 'transparent' : '#60dabf')}
    ${({ background }) => background || ''} center / cover no-repeat;

  img {
    border-radius: 50%;
    width: 55px;
    height: 55px;
  }
  .initials {
    font-weight: bold;
    font-size: 32px;
    color: ${whiteColor};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
