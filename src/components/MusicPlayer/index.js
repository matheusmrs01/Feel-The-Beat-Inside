import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import {
    playOrPauseTheMusic
} from '../../store/modules/playlist/action';

import {
    Container,
    ContainerTracks,
    Avatar,
    ContainerDescription,
    Name,
    Owner,
    TouchableIcon
} from './styles';

const MusicPlayer = () => {
    const dispatch = useDispatch()

    const currentSongPlaying = useSelector(state => state.playlist.currentSongPlaying)
    const indexCurrentSongPlaying = useSelector(state => state.playlist.indexCurrentSongPlaying)
    const songsPlaying = useSelector(state => state.playlist.songsPlaying)
    const indexCurrentPlayList = useSelector(state => state.playlist.indexCurrentPlayList)
    const isMusicPaused = useSelector(state => state.playlist.isMusicPaused)

    async function getMusic() {
        let response
        try {
            response = await api.get(`/me/player/currently-playing`)
        } catch (err) {
            console.tron.warn(err.response)
            return
        }
        // Linking.openURL(response.data.external_urls.spotify)
        console.tron.warn(response.data)
        return
    }

    function handlePause() {
        dispatch(playOrPauseTheMusic(!isMusicPaused))
    }

    // useEffect(() => {
    //     getMusic()
    // }, [])
    return (
        <Container>
            <ContainerTracks onPress={() => { }}>
                <Avatar source={{ uri: currentSongPlaying.track.album.images[0].url }} />
                <ContainerDescription>
                    <Name>{currentSongPlaying.track.name}</Name>
                    <Owner>de {currentSongPlaying.track.artists[0].name}</Owner>
                    <Owner>{currentSongPlaying.track.album.name}</Owner>
                </ContainerDescription>
            </ContainerTracks>
            <TouchableIcon onPress={handlePause}>
                <MaterialCommunityIcons name={isMusicPaused ? "play" : "pause"} size={32} color="#81b71a" />
            </TouchableIcon>
        </Container>
    );
}

export default MusicPlayer;