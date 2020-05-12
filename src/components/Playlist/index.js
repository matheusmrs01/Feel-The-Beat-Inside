import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import { selectPlaylist, playTheMusic } from '../../store/modules/playlist/action';

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
    const indexCurrentPlayList = useSelector(state => state.playlist.indexCurrentPlayList)

    async function handlePlaylist() {
        let response
        try {
            response = await api.get(`${data.tracks.href.split('v1')[1]}`)
        } catch (e) {
            console.tron.warn(e)
            Alert.alert('Erro ao buscar musicas', 'Não foi possível buscar as musicas dessa playlist, tente novamente mais tarde.')
            return
        }
        dispatch(selectPlaylist(data, response.data))
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

        dispatch(playTheMusic(response.data, response.data.items[0], 0, index))
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
                {index === indexCurrentPlayList ?
                    <MaterialCommunityIcons name="pause" size={32} color="#81b71a" /> :
                    <MaterialCommunityIcons name="play" size={32} color="#fff" />
                }
            </TouchableIcon>
        </Container>
    );
}

export default Playlist;
