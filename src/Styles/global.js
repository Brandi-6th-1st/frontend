import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
  * {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
    cursor: pointer;
  }

  body {
    line-height: 1;
    margin: 0;
    height: 100vh;
    width: 100vw;
    background-color: #34373A;
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
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;
export default GlobalStyle;
