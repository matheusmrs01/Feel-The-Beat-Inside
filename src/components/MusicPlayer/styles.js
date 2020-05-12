import styled from 'styled-components/native';
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Container = styled.View`
    background: #222222;
`;

export const ContainerFullScreenMode = styled.View`
    flex: 1;
    justify-content: center;
`;

export const ContainerSongOptions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-right: 20px;
    padding-left: 20px;

    height: ${props => height * props.percentageWidth}px;
    width: 100%;
`;

export const ContainerTracks = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContainerTracksFullScreen = styled.View`
    flex: 1;
    justify-content: center;
`;

export const DownIconTouchable = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;

export const Avatar = styled.Image`
    width: 70px;
    height: 70px;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    margin-right: 10px;
`;

export const AvatarFullScreen = styled.Image`
    width: 100%;
    height: ${height * 0.4}px;
`;

export const ContainerDescription = styled.View`
    width: ${width * 0.6}px;
`;

export const MusicPlayerContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${height * 0.1}px;
`;

export const Name = styled.Text`
    text-align: left;
    font-weight: bold;
    color: #fff;
`;

export const Owner = styled.Text`
    text-align: left;
    color: #ccc;
    font-size: 10px;
`;

export const TouchableDefault = styled.TouchableOpacity``;

export const TouchableIcon = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContainerLoadingBar = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-radius: 10px;
`;

export const LoadingBar = styled.View`
    position: absolute;
    width: ${props => props.percentageProgressBar}%;
    height: 20px;
    background: #81b71a;
    border-radius: 5px;
`;

export const ContainerTime = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const SongTime = styled.Text`
    color: #fff;
    margin-left: 5px;
`;
