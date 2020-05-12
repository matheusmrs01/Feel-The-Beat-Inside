import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import {
    playOrPauseTheMusic,
    playNextSong,
    playTheMusic
} from '../../store/modules/playlist/action';

import {
    Container,
    ContainerSongOptions,
    ContainerTracks,
    Avatar,
    ContainerDescription,
    Name,
    Owner,
    TouchableIcon,
    ContainerTracksFullScreen,
    AvatarFullScreen,
    MusicPlayerContainer,
    ContainerFullScreenMode,
    DownIconTouchable,
    TouchableDefault
} from './styles';

const MusicPlayer = () => {
    const dispatch = useDispatch()

    const [percentageWidth, setPercentageWidth] = useState(0.12)

    const currentSongPlaying = useSelector(state => state.playlist.currentSongPlaying)
    const indexCurrentSongPlaying = useSelector(state => state.playlist.indexCurrentSongPlaying)
    const songsPlaying = useSelector(state => state.playlist.songsPlaying)
    const indexCurrentPlayList = useSelector(state => state.playlist.indexCurrentPlayList)
    const isMusicPaused = useSelector(state => state.playlist.isMusicPaused)

    const userPLaylists = useSelector(state => state.playlist.playlists)

    function handlePause() {
        dispatch(playOrPauseTheMusic(!isMusicPaused))
    }

    function handleSong() {
        setPercentageWidth(oldValue => oldValue === 0.12 ? 0.80 : 0.12)
        return
    }

    async function handleNextSogn() {
        if (songsPlaying.items[indexCurrentSongPlaying + 1]) {
            dispatch(playNextSong(songsPlaying.items[indexCurrentSongPlaying + 1], indexCurrentSongPlaying + 1))
            return
        } else {
            let nextPlaylist = userPLaylists[indexCurrentPlayList + 1] ? userPLaylists[indexCurrentPlayList + 1] : userPLaylists[0]
            let indexNextPlaylist = userPLaylists[indexCurrentPlayList + 1] ? indexCurrentPlayList + 1 : 0;
            let response
            try {
                response = await api.get(`${nextPlaylist.tracks.href.split('v1')[1]}`)
            } catch (e) {
                Alert.alert('Erro ao buscar musicas', 'Não foi possível buscar as musicas dessa playlist, tente novamente mais tarde.')
                return
            }
            dispatch(playTheMusic(response.data, response.data.items[0], 0, indexNextPlaylist))
            return

        }
    }

    return (
        <Container>
            <ContainerSongOptions percentageWidth={percentageWidth}>
                {percentageWidth === 0.12 ?
                    <>
                        <ContainerTracks onPress={handleSong}>
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
                    </>
                    :
                    <ContainerFullScreenMode>
                        <ContainerTracksFullScreen>
                            <DownIconTouchable onPress={handleSong}>
                                <MaterialCommunityIcons name="chevron-down" size={50} color="#fff" />
                            </DownIconTouchable>
                            <AvatarFullScreen source={{ uri: currentSongPlaying.track.album.images[0].url }} />
                            <ContainerDescription>
                                <Name>{currentSongPlaying.track.name}</Name>
                                <Owner>de {currentSongPlaying.track.artists[0].name}</Owner>
                                <Owner>{currentSongPlaying.track.album.name}</Owner>
                            </ContainerDescription>
                        </ContainerTracksFullScreen>
                        <MusicPlayerContainer>
                            <TouchableDefault onPress={() => { }}>
                                <MaterialCommunityIcons name="skip-previous" size={80} color="#fff" />
                            </TouchableDefault>

                            <TouchableDefault onPress={handlePause}>
                                <MaterialCommunityIcons name={isMusicPaused ? "play" : "pause"} size={80} color="#fff" />
                            </TouchableDefault>

                            <TouchableDefault onPress={handleNextSogn}>
                                <MaterialCommunityIcons name="skip-next" size={80} color="#fff" />
                            </TouchableDefault>
                        </MusicPlayerContainer>
                    </ContainerFullScreenMode>
                }

            </ContainerSongOptions>
        </Container>
    );
}

export default MusicPlayer;
