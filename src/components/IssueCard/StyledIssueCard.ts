import styled from 'styled-components';
import { whiteColor } from '../GlobalStyle/StyledGlobal';
import selectedIco from '../../assets/icons/selected.png';

interface Iprops {
  current: boolean;
}

export const StyledIssueCard = styled.div<Iprops>`
  display: flex;
  flex: 0 0 300px;
  max-width: 300px;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 10px;
  min-height: 75px;
  background: ${(props) => (props.current ? 'rgba(96, 218, 191, 0.33)' : whiteColor)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  transition: all 0.2s ease;

  .upd-issue-card-title {
    border: none;
    border-radius: 5px;
    outline: none;
    height: 30px;
    width: 150px;
    font-size: 18px;
  }

  .upd-issue-card-priority {
    outline: none;
  }

  &:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.45);
    background-color: rgba(96, 218, 191, 0.13);
  }

  .issue-card-name,
  .issue-card-prior {
    display: block;
    width: 100%;
  }

  .edit-wrapper {
    display: flex;
    .edit-img,
    .delete-img {
      cursor: pointer;
      border-radius: 3px;
      width: 35px;
      transition: all 0.2s ease;
      &:hover {
        box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }

  .plus-img {
    cursor: pointer;
    width: 35px;
  }
  .selected-card-skin {
    position: absolute;
    background-color: rgba(96, 218, 191, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    &::after {
      position: absolute;
      content: url(${selectedIco});
      transform: scale(0.3);
      top: -52px;
      left: 170px;
    }
  }
`;

export const StyledIssueInfo = styled.div`
  .issue-card-name {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 28px;
  }
`;
