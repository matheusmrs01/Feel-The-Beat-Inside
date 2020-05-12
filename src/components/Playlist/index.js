import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import {
    selectPlaylist,
    playTheMusic,
    playOrPauseTheMusic
} from '../../store/modules/playlist/actions';

import { refreshToken, logout } from '../../store/modules/auth/actions';

import {
    Container,
    ContainerTracks,
    Avatar,
    ContainerDescription,
    Name,
    Owner,
    TouchableIcon
} from './styles';

const Playlist = ({ data, index }) => {
    const dispatch = useDispatch()

    const refreshTokenVariable = useSelector(state => state.auth.refresh_token);

    const indexCurrentPlayListPlaying = useSelector(state => state.playlist.indexCurrentPlayListPlaying)
    const isMusicPaused = useSelector(state => state.playlist.isMusicPaused)
    const currentSongPlaying = useSelector(state => state.playlist.currentSongPlaying)

    const colorIcon = indexCurrentPlayListPlaying === index ? '#81b71a' : '#fff';
    const iconName = indexCurrentPlayListPlaying === index && isMusicPaused ? 'play' : indexCurrentPlayListPlaying !== index ? 'play' : 'pause';

    async function handlePlaylist() {
        let response
        try {
            response = await api.get(`${data.tracks.href.split('v1')[1]}`)
        } catch (e) {
            requestNewTokens()
            return
        }
        dispatch(selectPlaylist(data, response.data, index))
        return
    }

    async function requestNewTokens() {
        let response
        try {
            response = await refreshSpotifyTokens(refreshTokenVariable)
        } catch (err) {
            Alert.alert('Erro ao buscar musicas', 'Não foi possível buscar as musicas dessa playlist, refaça o login e tente novamente.')
            dispatch(logout())
            return
        }

        const { access_token, expires_in, refresh_token } = response;
        const expirationTime = new Date().getTime() + expires_in * 1000;

        dispatch(refreshToken(access_token, expirationTime, refresh_token))
        Alert.alert('Desculpe o encomodo!', 'Foi necessário renovar suas credenciais de acesso, tente acessar a playlist novamente.')
        return
    }

    async function handlePlaySongs() {
        let response
        try {
            response = await api.get(`${data.tracks.href.split('v1')[1]}`)
        } catch (e) {
            console.tron.warn(e)
            Alert.alert('Erro ao buscar musicas', 'Não foi possível buscar as musicas dessa playlist, tente novamente mais tarde.')
            return
        }

        if (isMusicPaused) {
            if (index === indexCurrentPlayListPlaying) {
                dispatch(playOrPauseTheMusic(false))
            } else {
                dispatch(playOrPauseTheMusic(false))
                dispatch(playTheMusic(response.data, response.data.items[0], 0, index))
            }
        } else {
            if (currentSongPlaying && index === indexCurrentPlayListPlaying) {
                dispatch(playOrPauseTheMusic(true))
            } else {
                dispatch(playOrPauseTheMusic(false))
                dispatch(playTheMusic(response.data, response.data.items[0], 0, index))
            }
        }

        return
    }

    return (
        <Container>
            <ContainerTracks onPress={handlePlaylist}>
                <Avatar source={{ uri: data.images[0].url }} />
                <ContainerDescription>
                    <Name>{data.name}</Name>
                    <Owner>de {data.owner.display_name}</Owner>
                </ContainerDescription>
            </ContainerTracks>
            <TouchableIcon onPress={handlePlaySongs}>
                <MaterialCommunityIcons name={iconName} size={32} color={colorIcon} />
                {/* {index === indexCurrentPlayList && isMusicPaused ?
                    <MaterialCommunityIcons name={isMusicPaused ? "play" : "pause"} size={32} color={colorIcon} /> :
                } */}
            </TouchableIcon>
        </Container>
    );
}

export default Playlist;
