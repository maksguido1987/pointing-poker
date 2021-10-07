import styled, { css } from 'styled-components';
import { vME } from '../../types/globalVariables';
import { blackColor, whiteColor } from '../GlobalStyle/StyledGlobal';

export const StyledMsg = styled.div`
  display: flex;
  ${({ viewType }: { viewType: string }) =>
    viewType === vME
      ? css`
          flex-direction: row-reverse;
          align-items: flex-end;
        `
      : css`
          flex-direction: row;
          align-items: flex-end;
        `};
  margin: 0.5rem 0;

  .text-bubble {
    ${({ viewType }: { viewType: string }) =>
      viewType === vME
        ? css`
            justify-content: flex-end;
            margin: 0 7px 0 15px;
          `
        : css`
            justify-content: flex-start;
            margin: 0 15px 0 7px;
          `};
  }

  .chat-username {
    color: ${({ viewType }: { viewType: string }) => (viewType === vME ? '#ffe28c' : '#5F9747')};
  }

  .msg-txt {
    ${({ viewType }: { viewType: string }) =>
      viewType === vME
        ? css`
            background-color: #248bf5;
            color: ${whiteColor};
          `
        : css`
            background-color: #e5e5ea;
            color: ${blackColor};
          `};
  }

  .msg-txt::before {
    ${({ viewType }: { viewType: string }) =>
      viewType === vME
        ? css`
            border-right: 1rem solid #248bf5;
            border-bottom-left-radius: 0.8rem 0.7rem;
            right: -0.35rem;
          `
        : css`
            border-left: 1rem solid #e5e5ea;
            border-bottom-right-radius: 0.8rem 0.7rem;
            left: -0.35rem;
          `}

    transform: translate(0, -0.1rem);
  }

  .msg-txt::after {
    ${({ viewType }: { viewType: string }) =>
      viewType === vME
        ? css`
            right: -40px;
            border-bottom-left-radius: 0.5rem;
          `
        : css`
            left: 20px;
            border-bottom-right-radius: 0.5rem;
          `};
    background-color: #f8f8ff;
    transform: translate(-30px, -2px);
    width: 10px;
  }

  .avatar-chat {
    object-fit: cover;
  }
`;
