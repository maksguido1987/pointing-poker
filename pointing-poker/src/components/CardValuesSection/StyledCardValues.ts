import styled from 'styled-components';

interface IStyledGameCardProps {
  events?: boolean;
}

export const StyleCardValuesSection = styled.div<IStyledGameCardProps>`
  text-align: center;
  pointer-events: ${(props) => (!props.events ? 'auto' : 'none')};
  .text {
    font-size: 24px;
    font-weight: bold;
    margin: 70px 0 20px 0;
  }
  .flex-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: auto;
  }
`;
