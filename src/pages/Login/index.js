import React from 'react';
import { Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import api from '../../service/api';
import { signInSuccess } from '../../store/modules/auth/actions';
import getToken from '../../utils/getTokens';

import Background from '../../components/Background';

import { Container, TouchableContainer, Label } from './styles';

export default function Login({ navigation }) {
    const dispatch = useDispatch();

    async function login() {
        let AuthorizationContent
        let response

        try {
            AuthorizationContent = await getToken();
        } catch (err) {
            Alert.alert('Erro ao logar com o Spotify', 'Tente novamente mais tarde!');
            return
        }

        const {
            access_token,
            refresh_token,
            expires_in
        } = AuthorizationContent;

        api.defaults.headers.Authorization = `Bearer ${access_token}`;

        try {
            response = await api.get('/me')
        } catch (err) {
            Alert.alert('Erro ao logar com o Spotify', 'Tente novamente mais tarde!');
            return
        }

        const expirationTime = new Date().getTime() + expires_in * 1000;
        dispatch(signInSuccess(access_token, expirationTime, refresh_token, response.data.id))
        return
    }

    return (
        <Background>
            <Container>
                <TouchableContainer onPress={login}>
                    <MaterialCommunityIcons name="spotify" size={32} color="#81b71a" />
                    <Label>Login com Spotify</Label>
                </TouchableContainer>
            </Container>
        </Background>
    );
};
