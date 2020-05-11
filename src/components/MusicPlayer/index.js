import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../service/api';

import {
    Container,
    ContainerTracks,
    Avatar,
    ContainerDescription,
    Name,
    Owner,
    TouchableIcon
} from './styles';

const MusicPlayer = ({ data }) => {
    console.tron.warn(data)

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

    // useEffect(() => {
    //     getMusic()
    // }, [])
    return (
        <Container>
            {data &&
                <>
                    <ContainerTracks onPress={() => { }}>
                        <Avatar source={{ uri: data ? data.track.album.images[0].url : <MaterialCommunityIcons name="image-broken-variant" size={32} color="#fff" /> }} />
                        <ContainerDescription>
                            <Name>{data ? data.track.name : ''}</Name>
                            <Owner>de {data ? data.track.album.name : ''}</Owner>
                        </ContainerDescription>
                    </ContainerTracks>
                    <TouchableIcon onPress={() => { }}>
                        <MaterialCommunityIcons name="pause" size={32} color="#81b71a" />
                    </TouchableIcon>
                </>
            }
        </Container>
    );
}

export default MusicPlayer;
