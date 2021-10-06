import styled from 'styled-components';
import { whiteColor, blueColor } from '../GlobalStyle/StyledGlobal';

export const StyledChatInput = styled.form`
  .input-wrapper {
    background-color: ${whiteColor};
    display: flex;
    flex-direction: row;
    border-bottom: 3px solid #f2f2f2;
  }

  .text-input {
    font-family: 'Roboto';
    padding: 10px 5px;
    border: none;
    background-color: ${whiteColor};
    border-right: 1px solid #c5d0db;
    border-left: 1px solid #c5d0db;
    border-bottom: 1px solid #c5d0db;
    outline: none;
    resize: none;
    width: 400px;
    word-break: break-word;
  }

  [contentEditable='true']:empty::before {
    content: attr(data-placeholder);
    color: #a2acb4;
  }

  .send-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    background-color: ${blueColor};
    cursor: pointer;
  }

  .send-btn-img {
    transition: transform 0.5s ease-in-out;
  }
  .send-btn-img:hover {
    transform: rotate(-90deg);
    transition: transform 0.5s ease-in-out;
  }
`;
