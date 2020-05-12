import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    selectPlaylist,
    playTheMusic,
    playOrPauseTheMusic
} from '../../store/modules/playlist/actions';

import {
    Container,
    ContainerTracks,
    ContainerDescription,
    Name,
    Album,
    TouchableIcon
} from './styles';

const SongList = ({ data, index }) => {
    const dispatch = useDispatch()

    const currentSongPlaying = useSelector(state => state.playlist.currentSongPlaying)
    const indexCurrentSongPlaying = useSelector(state => state.playlist.indexCurrentSongPlaying)
    const songlist = useSelector(state => state.playlist.songlist)
    const indexCurrentPlayList = useSelector(state => state.playlist.indexCurrentPlayList)
    const isMusicPaused = useSelector(state => state.playlist.isMusicPaused)

    const iconName = currentSongPlaying && data.track.id === currentSongPlaying.track.id ? (isMusicPaused ? 'play' : 'pause') : 'play';
    const itemColor = currentSongPlaying && data.track.id === currentSongPlaying.track.id ? '#81b71a' : '#fff';

    function handleSong() {
        if (isMusicPaused) {
            if (index === indexCurrentSongPlaying) {
                dispatch(playOrPauseTheMusic(false))
            } else {
                dispatch(playOrPauseTheMusic(false))
                dispatch(playTheMusic(songlist, data, index, indexCurrentPlayList))
            }
        } else {
            if (currentSongPlaying && index === indexCurrentSongPlaying) {
                dispatch(playOrPauseTheMusic(true))
            } else {
                dispatch(playOrPauseTheMusic(false))
                dispatch(playTheMusic(songlist, data, index, indexCurrentPlayList))
            }
        }
    }

    return (
        <Container>
            <ContainerTracks onPress={handleSong}>
                <ContainerDescription>
                    <Name>{data.track.name}</Name>
                    <Album>{data.track.album.name}</Album>
                </ContainerDescription>
            </ContainerTracks>
            <TouchableIcon onPress={handleSong}>
                <MaterialCommunityIcons name={iconName} size={32} color={itemColor} />
            </TouchableIcon>
        </Container>
    );
}

export default SongList;
