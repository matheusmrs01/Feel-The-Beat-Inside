import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TouchableContainer = styled.TouchableOpacity`
    width: 50%;
    height: 80px;
    border-radius: 10px;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const Label = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: ${width * 0.045}px;
`;
