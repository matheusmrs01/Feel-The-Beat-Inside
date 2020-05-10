import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Background from '../../components/Background';

import { Container, TouchableContainer, Label } from './styles';

export default function Login({ navigation }) {
    return (
        <Background>
            <Container>
                <TouchableContainer onPress={() => { navigation.navigate('Home') }}>
                    <MaterialCommunityIcons name="spotify" size={32} color="#81b71a" />
                    <Label>Login com Spotify</Label>
                </TouchableContainer>
            </Container>
        </Background>
    );
};
