import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import {
    playOrPauseTheMusic
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

    function handlePause() {
        dispatch(playOrPauseTheMusic(!isMusicPaused))
    }

    function handleSong() {
        setPercentageWidth(oldValue => oldValue === 0.12 ? 0.80 : 0.12)
        return
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

                            <TouchableDefault onPress={() => { }}>
                                <MaterialCommunityIcons name={isMusicPaused ? "play" : "pause"} size={80} color="#fff" />
                            </TouchableDefault>

                            <TouchableDefault onPress={() => { }}>
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
