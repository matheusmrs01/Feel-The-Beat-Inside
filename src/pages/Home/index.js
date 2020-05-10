import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

const Home = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
            <Text>Go to login</Text>
        </TouchableOpacity>
    );
}

export default Home;
