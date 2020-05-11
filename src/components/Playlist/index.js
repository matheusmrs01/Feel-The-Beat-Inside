import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    return (
        <Container>
            <ContainerTracks onPress={() => { }}>
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
