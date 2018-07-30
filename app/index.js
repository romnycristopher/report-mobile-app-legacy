import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import LoginForm from './views/LoginForm';

class App extends Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store}> 
        <LoginForm />
      </Provider>
    );
  }
}

export default App;

