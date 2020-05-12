import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import sToTime from '../../utils/sToTime';

import {
    playOrPauseTheMusic,
    playNextSong,
    playTheMusic
} from '../../store/modules/playlist/actions';

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
    TouchableDefault,
    ContainerLoadingBar,
    LoadingBar,
    SongTime,
    ContainerTime
} from './styles';

let interval = null;

const MusicPlayer = () => {
    const dispatch = useDispatch()

    const [percentageWidth, setPercentageWidth] = useState(0.12)

    const currentSongPlaying = useSelector(state => state.playlist.currentSongPlaying)
    const indexCurrentSongPlaying = useSelector(state => state.playlist.indexCurrentSongPlaying)
    const songsPlaying = useSelector(state => state.playlist.songsPlaying)
    const indexCurrentPlayList = useSelector(state => state.playlist.indexCurrentPlayList)
    const isMusicPaused = useSelector(state => state.playlist.isMusicPaused)

    const userPLaylists = useSelector(state => state.playlist.playlists)

    const [valueTime, setValueTime] = useState(0)
    const [songTime, setSongTime] = useState(parseInt(currentSongPlaying.track.duration_ms / 1000))
    const [songTimeMissing, setSongTimeMissing] = useState(parseInt(currentSongPlaying.track.duration_ms / 1000))
    const [percentageProgressBar, setPercentageProgressBar] = useState(0)

    function onStart() {
        interval = setInterval(() => {
            setValueTime(oldValue => oldValue + 1)
        }, 1000)
    }

    function onPause() {
        if (isMusicPaused) {
            clearInterval(interval);
            return
        } else {
            onStart()
            return
        }
    }

    function handlePause() {
        if (isMusicPaused) {
            dispatch(playOrPauseTheMusic(!isMusicPaused))
        } else {
            dispatch(playOrPauseTheMusic(!isMusicPaused))
        }
        return
    }

    function handleSong() {
        setPercentageWidth(oldValue => oldValue === 0.12 ? 0.80 : 0.12)
        return
    }

    async function handlePreviousSong() {
        if (songsPlaying.items[indexCurrentSongPlaying - 1]) {
            dispatch(playNextSong(songsPlaying.items[indexCurrentSongPlaying - 1], indexCurrentSongPlaying - 1))
            return
        } else {
            dispatch(playNextSong(songsPlaying.items[indexCurrentSongPlaying], indexCurrentSongPlaying))
            return
        }
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

    useEffect(() => {
        setPercentageProgressBar((valueTime * 100) / songTime)
        setSongTimeMissing(oldValue => oldValue - 1)
    }, [valueTime])

    useEffect(() => {
        if (percentageProgressBar >= 100) {
            setValueTime(0)
            setPercentageProgressBar(0)
            handleNextSogn()
        }
    }, [percentageProgressBar])

    useEffect(() => {
        onPause()
    }, [isMusicPaused])

    useEffect(() => {
        setSongTime(parseInt(currentSongPlaying.track.duration_ms / 1000))
        setSongTimeMissing(parseInt(currentSongPlaying.track.duration_ms / 1000))
        setValueTime(0)
        setPercentageProgressBar(0)
    }, [currentSongPlaying])

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
                        <ContainerLoadingBar>
                            <LoadingBar percentageProgressBar={percentageProgressBar} />
                            <ContainerTime>
                                <SongTime>{sToTime(songTimeMissing)}</SongTime>
                            </ContainerTime>
                        </ContainerLoadingBar>
                        <MusicPlayerContainer>
                            <TouchableDefault onPress={handlePreviousSong}>
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
