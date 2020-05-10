import React from 'react';
import { useSelector } from 'react-redux';


import Routes from './routes';

export default function Index() {
    const isSignedIn = useSelector(state => state.auth.signed)

    return (
        <Routes isSignedIn={isSignedIn} />
    )
}

