import { createGlobalStyle } from 'styled-components';

export const blueColor = '#2B3A67';
export const whiteColor = '#ffffff';
export const beigeColor = '#fdd1a1';
export const blackColor = '#000';

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family:'Roboto';
    font-style: normal;
    -webkit-touch-callout: none; 
    -webkit-user-select: none;   
    -khtml-user-select: none;    
    -moz-user-select: none;      
    -ms-user-select: none;       
    user-select: none;
}

*::before,
*::before {
  box-sizing: inherit;
}
.project-container{
}
 ul {
  list-style-type: none;
}

a {
  text-decoration: none !important;
}

body {
  width: 100%;
  height: 100%;
  overflow-x:hidden;

}

#root {
  width: 100%;
  height: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 0 20px;
}
`;

export default GlobalStyle;
