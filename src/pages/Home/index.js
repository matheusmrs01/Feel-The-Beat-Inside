import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';
import { refreshToken, logout } from '../../store/modules/auth/actions';
import refreshSpotifyTokens from '../../utils/refreshTokens';
import Background from '../../components/Background';
import Playlist from '../../components/Playlist';
import MusicPlayer from '../../components/MusicPlayer';

import { Container, Content, Playlists } from './styles';

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const refreshTokenVariable = useSelector(state => state.auth.refresh_token);
    const tokenExpirationTime = useSelector(state => state.auth.expires_in)
    const userId = useSelector(state => state.auth.spotifyUserId)

    const [playlists, setPlaylists] = useState([])
    const [acceessToken, setAccessToken] = useState(useSelector(state => state.auth.access_token))

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

        dispatch(refreshToken(access_token, expirationTime, refresh_token))
        return
    }

    async function getMysPlaylists() {
        let response

        api.defaults.headers.Authorization = await `Bearer ${acceessToken}`

        try {
            response = await api.get(`/users/${userId}/playlists?limit=20`)
        } catch (err) {
            Alert.alert('Erro ao buscar playlists', 'Tente novamente mais tarde!')
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
        <Background>
            <Container>
                <Content>
                    <Playlists
                        data={playlists}
                        keyExtractor={item => String(item.id)}
                        renderItem={
                            ({ item }) => (
                                <Playlist data={item} />
                            )
                        }
                    />
                </Content>
                <MusicPlayer />
            </Container>
        </Background>
    );
}
