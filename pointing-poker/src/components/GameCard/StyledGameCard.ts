import styled, { css, keyframes } from 'styled-components';
import { blueColor, beigeColor } from '../GlobalStyle/StyledGlobal';
import cardBackFon from '../../assets/icons/card-back-fon.jpg';

interface IStyledGameCardProps {
  selected: boolean;
  isStats: boolean;
}

export const show = keyframes`  
  0% { 
  box-shadow:inset  0 0 10px 2px transparent, 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: scale(1);
  z-index:10;
  }
  50%{
  box-shadow: inset  0 0 10px 2px ${beigeColor}, 0 0 10px 5px ${beigeColor};
  transform: scale(1.05);
  z-index:10;

  }
 100% {   
  box-shadow:inset  0 0 10px 2px transparent, 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: scale(1);
  z-index:10;

 }
`;

const animation = () =>
  css`
    ${show} 1s infinite;
  `;

export const StyledGameCard = styled.div<IStyledGameCardProps>`
  position: relative;
  width: 100px;
  height: 165px;
  margin: ${(props) => (props.isStats ? '50px 5px 0px' : '10px 3px 0')};

  .front,
  .back {
    top: 0;
    left: 0;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 1px solid #b9b9b9;
    transition: transform 1s linear;
    width: 100%;
    height: 100%;
  }

  .front {
    animation: ${(props) => (props.selected ? animation : 'none')};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 1px solid #b9b9b9;
    background-color: ${(props) => (props.selected ? '#fff9e5' : 'white')};
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transform: perspective(650px)
      ${(props) => (props.isStats ? ' rotateY(180deg)' : ' rotateY(0deg)')};
  }
  .back {
    transform: perspective(650px)
      ${(props) => (props.isStats ? ' rotateY(0deg)' : ' rotateY(-180deg)')};
    background-image: ${`url(${cardBackFon})`};
    background-position: center;
    background-size: contain;
  }

  .flipped-front {
    transform: perspective(650px) rotateY(0);
  }
  .flipped-back {
    transform: perspective(650px) rotateY(-180deg);
  }

  img {
    width: 70px;
    margin-bottom: 10px;
    @media (max-width: 650px) {
      width: 40px;
    }
  }

  .stats {
    color: ${blueColor};
    text-shadow: 0 0 5px ${beigeColor};
    font-size: 25px;
    top: -30px;
    position: absolute;
    @media (max-width: 650px) {
      font-size: 18px;
    }
  }

  .number {
    font-size: 60px;
    text-shadow: 0px 0px 5px ${beigeColor};
    @media (max-width: 650px) {
      font-size: 40px;
    }
  }

  .type-left {
    align-self: flex-start;
  }

  .type-right {
    align-self: flex-end;
  }

  @media (max-width: 650px) {
    width: 70px;
    height: 120px;
    font-size: 14px;
  }
`;
