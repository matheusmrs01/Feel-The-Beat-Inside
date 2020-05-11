import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../service/api';
import { refreshToken, logout } from '../../store/modules/auth/actions';
import refreshSpotifyTokens from '../../utils/refreshTokens';

// import { Container } from './styles';

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const refreshTokenVariable = useSelector(state => state.auth.refresh_token);
    const tokenExpirationTime = useSelector(state => state.auth.expires_in)
    const userId = useSelector(state => state.auth.spotifyUserId)

    const [playlists, setPlaylists] = useState([])

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
        setAccessToken(access_token)

        api.defaults.headers.Authorization = `Bearer ${access_token}`;

        dispatch(refreshToken(access_token, expirationTime, refresh_token))
        return
    }

    async function getMysPlaylists() {
        let response

        try {
            response = await api.get(`/users/${userId}/playlists?limit=50`)
        } catch (error) {
            alert.alert('Erro ao buscar playlists', 'Tente novamente mais tarde!')
            return
        }

        setPlaylists(response.data.items)
        return
    }

    useEffect(() => {
        if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
            requestNewTokens()
        }

        getMysPlaylists()
    }, [])

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
            <Text>Go to login</Text>
        </TouchableOpacity>
    );
}
