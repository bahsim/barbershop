import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import { makeStore } from './modules/store';

import { Main } from "./ui/main";

const store = makeStore();

const Root = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

render(<Root />, document.getElementById('app'))
