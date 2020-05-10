import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

const Login = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
            <Text>Go to Home</Text>
        </TouchableOpacity>
    );
}

export default Login;
