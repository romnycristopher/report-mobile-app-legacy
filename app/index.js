import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import RouterComponent from './config/RouterComponent';

class App extends Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store}>
         <RouterComponent />
      </Provider>
    );
  }
}

export default App;
