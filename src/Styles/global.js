import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
  
  * {
  box-sizing: border-box;
  }
  a {
  text-decoration: none;
  color: inherit;
  }
  img {
    max-width: 100%;
  }
  button,
  input {
    outline: 0;
    border: 0;
    background: none;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;;
  }
`;
export default GlobalStyle;
