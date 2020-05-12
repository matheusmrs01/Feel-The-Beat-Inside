import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../service/api';

import { refreshToken, logout } from '../../store/modules/auth/actions';
import { stopTheMusic } from '../../store/modules/playlist/action';
import refreshSpotifyTokens from '../../utils/refreshTokens';

import Background from '../../components/Background';
import Playlist from '../../components/Playlist';
import SongList from '../../components/SongList';
import MusicPlayer from '../../components/MusicPlayer';

import { Container, Content, Playlists } from './styles';

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const refreshTokenVariable = useSelector(state => state.auth.refresh_token);
    const tokenExpirationTime = useSelector(state => state.auth.expires_in)
    const userId = useSelector(state => state.auth.spotifyUserId)

    const isPlaylistTime = useSelector(state => state.playlist.isPlaylistTime)
    const songList = useSelector(state => state.playlist.songlist)

    const currentSongPlaying = useSelector(state => state.playlist.currentSongPlaying)
    const indexCurrentSongPlaying = useSelector(state => state.playlist.indexCurrentSongPlaying)
    const songsPlaying = useSelector(state => state.playlist.songsPlaying)
    const indexCurrentPlayList = useSelector(state => state.playlist.indexCurrentPlayList)

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
        dispatch(stopTheMusic())
        getMysPlaylists()
    }, [])

    return (
        <Background>
            <Container>
                <Content>
                    <Playlists
                        data={isPlaylistTime ? playlists : songList.items}
                        keyExtractor={item => isPlaylistTime ? String(item.id) : String(item.track.id)}
                        renderItem={
                            ({ item, index }) => (
                                isPlaylistTime ? (
                                    <Playlist data={item} index={index} />
                                ) : (
                                        <SongList data={item} index={index} />
                                    )
                            )
                        }
                    />
                </Content>
                {currentSongPlaying &&
                    <MusicPlayer />
                }
            </Container>
        </Background>
    );
}
