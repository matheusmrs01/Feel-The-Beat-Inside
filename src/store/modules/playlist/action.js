export function selectPlaylist(playlist, songlist) {
    return {
        type: '@playlist/SELECT_PLAYLIST',
        playlist: playlist,
        songlist: songlist,
    };
}
