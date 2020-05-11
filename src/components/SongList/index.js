import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { returnToHome } from '../../store/modules/playlist/action';

import {
    Container,
    ContainerTracks,
    ContainerDescription,
    Name,
    Album,
    TouchableIcon
} from './styles';

const SongList = ({ data }) => {
    return (
        <Container>
            <ContainerTracks onPress={() => { }}>
                <ContainerDescription>
                    <Name>{data.track.name}</Name>
                    <Album>{data.track.album.name}</Album>
                </ContainerDescription>
            </ContainerTracks>
            <TouchableIcon onPress={() => { }}>
                <MaterialCommunityIcons name="play" size={32} color="#fff" />
            </TouchableIcon>
        </Container>
    );
}

export default SongList;
