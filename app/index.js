import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterNav from './config/router';
import NavigationService from './config/NavigationService';

class App extends Component {

    componentWillMount() {
        // Initialize Firebase
        const config = {
            apiKey: 'AIzaSyCRUckd0q4d1ftEvnGchNnULJjytbD-F54',
            authDomain: 'aicoapp-fb-7e113.firebaseapp.com',
            databaseURL: 'https://aicoapp-fb-7e113.firebaseio.com',
            projectId: 'aicoapp-fb-7e113',
            storageBucket: 'aicoapp-fb-7e113.appspot.com',
            messagingSenderId: '1045052957285'
        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <RouterNav
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}

export default App;
