import styled from 'styled-components';

export const StyledScramMasterSection = styled.div`
  margin-top: 20px;

  .text {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 10px;
  }

  .key-text {
    margin: 25px 0 10px;
    font-style: italic;
    font-size: 24px;
  }

  .empty {
    width: 20px;
    height: 50px;
  }

  .flex-box,
  .flex-box-2 {
    width: 490px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 650px) {
      width: 360px;
    }
  }

  .flex-box-2 {
    width: 100%;
    margin-top: 20px;
  }

  .scram-master-input {
    text-align: center;
    width: 100%;
    font-size: 25px;
    padding: 0 10px;
    outline: none;
    border: none;
    border: 1px solid black;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 0px 10px;
  }
`;
