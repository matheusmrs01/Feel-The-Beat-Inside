import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../service/api';

import { refreshToken, logout } from '../../store/modules/auth/actions';
import { stopTheMusic, setUserPlaylists } from '../../store/modules/playlist/actions';
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

    const [playlists, setPlaylists] = useState([])
    const [loadingRefresh, setLoadingRefresh] = useState(false)
    const [acceessToken, setAccessToken] = useState(useSelector(state => state.auth.access_token))

    const [nextPage, setNextPage] = useState()
    const [totalResults, setTotalResults] = useState(0)
    const [loadingMorePlaylists, setLoadingMorePlaylists] = useState(false)

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
        getMysPlaylists()
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
        setNextPage(response.data.next)
        setTotalResults(response.data.total)

        dispatch(setUserPlaylists(response.data.items))
        setPlaylists(response.data.items)
        return
    }

    async function loadingMoreData() {
        if (loadingMorePlaylists) {
            return;
        }

        if (!nextPage) {
            return
        }

        setLoadingMorePlaylists(true)

        let response

        api.defaults.headers.Authorization = await `Bearer ${acceessToken}`

        try {
            response = await api.get(nextPage.split('v1')[1])
        } catch (err) {
            Alert.alert('Erro ao buscar playlists', 'Tente novamente mais tarde!')
            return
        }

        setNextPage(response.data.nextPage)
        setPlaylists([...playlists, ...response.data.items])
        setLoadingMorePlaylists(false)
        return
    }

    function onRefresh() {
        getMysPlaylists()
        return
    }

    useEffect(() => {
        dispatch(stopTheMusic())
        if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
            requestNewTokens()
        } else {
            getMysPlaylists()
        }
    }, [])

    return (
        <Background>
            <Container>
                <Content>
                    <Playlists
                        data={isPlaylistTime ? playlists : songList.items}
                        keyExtractor={item => isPlaylistTime ? String(item.id) : String(item.track.id)}
                        refreshing={loadingRefresh}
                        onRefresh={isPlaylistTime ? onRefresh : null}
                        onEndReached={isPlaylistTime ? loadingMoreData : null}
                        onEndReachedThreshold={isPlaylistTime ? 0.2 : null}
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
