import React from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import { selectPlaylist } from '../../store/modules/playlist/action';

import {
    Container,
    ContainerTracks,
    Avatar,
    ContainerDescription,
    Name,
    Owner,
    TouchableIcon
} from './styles';

const Playlist = ({ data }) => {
    const dispatch = useDispatch()

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

    return (
        <Container>
            <ContainerTracks onPress={handlePlaylist}>
                <Avatar source={{ uri: data.images[0].url }} />
                <ContainerDescription>
                    <Name>{data.name}</Name>
                    <Owner>de {data.owner.display_name}</Owner>
                </ContainerDescription>
            </ContainerTracks>
            <TouchableIcon onPress={() => { }}>
                <MaterialCommunityIcons name="play" size={32} color="#fff" />
            </TouchableIcon>
        </Container>
    );
}

export default Playlist;
