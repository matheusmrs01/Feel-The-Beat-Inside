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
