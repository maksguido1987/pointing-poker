import styled from 'styled-components';
import { whiteColor, blueColor } from '../GlobalStyle/StyledGlobal';

export const StyleFooter = styled.footer`
  display: flex;
  position: relative;
  flex: 0 1 auto;
  width: 100%;
  padding: 5px 0 5px 140px;
  background: ${blueColor} url('../../assets/icons/github-ico.svg') 60px / 60px no-repeat;

  ul {
    text-decoration: none;
  }
  a {
    color: ${whiteColor};
    font-size: 12px;
    text-shadow: 0px 0px 5px #66999b;
  }

  div {
    font-size: 30px;
    position: absolute;
    top: 23px;
    right: 60px;
    font-weight: bold;
    text-shadow: 0 0 5px ${whiteColor};
  }
  img {
    position: absolute;
    top: 15px;
    right: 140px;
    width: 100px;
  }
`;
