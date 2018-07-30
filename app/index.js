import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Navigator } from './config/router';

class App extends Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store}> 
        <Navigator />
      </Provider>
    );
  }
}

export default App;

