import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import Routes from './src/routes';

export default function Index() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <Routes />
        </>
    )
}

