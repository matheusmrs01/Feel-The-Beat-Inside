import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: ${height * 0.12}px;
`;

export const ContainerTracks = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContainerDescription = styled.View`
    width: ${width * 0.6}px;
`;

export const Name = styled.Text`
    text-align: left;
    font-weight: bold;
    color: #fff;
`;

export const Album = styled.Text`
    text-align: left;
    color: #ccc;
    font-size: 10px;
`;

export const TouchableIcon = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
