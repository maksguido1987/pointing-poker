import styled from 'styled-components';

export const StyleBody = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  min-height: 880px;
  height: 100%;
  margin-bottom: 50px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 1200px) {
    width: 90%;
  }
`;
