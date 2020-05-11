import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;

export const Content = styled.View`
    flex: 1;
    margin: 10px 20px 0 20px;
`;

export const Playlists = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    width: 100%;
`;
