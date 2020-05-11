import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { refreshToken, logout } from '../../store/modules/auth/actions';
import refreshSpotifyTokens from '../../utils/refreshTokens';

// import { Container } from './styles';

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const refreshTokenVariable = useSelector(state => state.auth.refresh_token);
    const tokenExpirationTime = useSelector(state => state.auth.expires_in)

    async function requestNewTokens() {
        let response
        try {
            response = await refreshSpotifyTokens(refreshTokenVariable)
        } catch (err) {
            dispatch(logout())
            return
        }

        const { access_token, expires_in, refresh_token } = response;
        const expirationTime = new Date().getTime() + expires_in * 1000;

        dispatch(refreshToken(access_token, expirationTime, refresh_token))
        return
    }

    useEffect(() => {
        if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
            requestNewTokens()
        }
    }, [])

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
            <Text>Go to login</Text>
        </TouchableOpacity>
    );
}
