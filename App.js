import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './src/store';

import Routes from './src/routes';

export default function Index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar barStyle="light-content" backgroundColor="#312e38" />
                <Routes />
            </PersistGate>
        </Provider>
    )
}

