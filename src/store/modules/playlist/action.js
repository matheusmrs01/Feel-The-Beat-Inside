export function selectPlaylist(playlist, songlist) {
    return {
        type: '@playlist/SELECT_PLAYLIST',
        playlist: playlist,
        songlist: songlist,
    };
}

export function returnToHome() {
    return {
        type: '@playlist/RETURN_TO_HOME',
    };
}

export function playTheMusic(songsPlaying, currentSongPlaying, indexCurrentSongPlaying, indexCurrentPlayList) {
    return {
        type: '@playlist/PLAY_THE_PLAYLIST',
        songsPlaying: songsPlaying,
        currentSongPlaying: currentSongPlaying,
        indexCurrentSongPlaying: indexCurrentSongPlaying,
        indexCurrentPlayList: indexCurrentPlayList,
    };
}

export function stopTheMusic() {
    return {
        type: '@playlist/STOP_THE_MUSIC',
    };
}
