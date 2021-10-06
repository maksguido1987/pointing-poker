import styled from 'styled-components';

export const StyledStatisticsSection = styled.div`
  width: 570px;
  height: 100%;
  padding: 20px 10px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-left: 50%;
  transform: translateX(-50%) scale(0.8);
  justify-content: space-between;

  .top-text {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  .flex-box {
    pointer-events: none !important;
    justify-content: center;
  }

  @media (max-width: 650px) {
    margin-left: -110px;
    margin-top: -130px;
    transform: scale(0.6);
  }
`;
