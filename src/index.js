import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './Store/Reducer/index';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './Styles/global';
import theme from './Styles/theme';

const store = createStore(combineReducers);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
      <GlobalStyle />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
