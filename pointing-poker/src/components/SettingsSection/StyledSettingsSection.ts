import styled from 'styled-components';

export const StyledSettingsSection = styled.div`
  margin-bottom: 40px;
  margin-top: 50px;

  .text {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    width: 100%;
    height: 60px;

    .setting-name {
      font-size: 24px;
      font-weight: bold;
      @media (max-width: 650px) {
        font-size: 20px;
      }
    }
  }

  .timer {
    margin-top: 10px;

    .setting-name {
      margin-top: 50px;
    }
  }

  select {
    cursor: pointer;
    width: 200px;
    padding-left: 5px;
    font-size: 20px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
