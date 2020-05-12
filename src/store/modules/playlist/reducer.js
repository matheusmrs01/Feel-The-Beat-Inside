import produce from 'immer';

const INITIAL_STATE = {
    playlist: null,
    songlist: null,
    songsPlaying: null,
    currentSongPlaying: null,
    indexCurrentSongPlaying: 0,
    indexCurrentPlayList: 0,
    isMusicPaused: false,
    isPlaylistTime: true,
};

export default function playlist(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@playlist/SELECT_PLAYLIST': {
                draft.playlist = action.playlist;
                draft.songlist = action.songlist;
                draft.isPlaylistTime = false;
                break;
            }
            case '@playlist/RETURN_TO_HOME': {
                draft.playlist = null;
                draft.songlist = null;
                draft.isPlaylistTime = true;
                break;
            }
            case '@playlist/PLAY_THE_PLAYLIST': {
                draft.songsPlaying = action.songsPlaying;
                draft.currentSongPlaying = action.currentSongPlaying;
                draft.indexCurrentSongPlaying = action.indexCurrentSongPlaying;
                draft.indexCurrentPlayList = action.indexCurrentPlayList;
                break;
            }
            case '@playlist/STOP_THE_MUSIC': {
                draft.currentSongPlaying = null;
                draft.indexCurrentSongPlaying = 0;
                draft.indexCurrentPlayList = 0;
                draft.songsPlaying = null;
                break;
            }
            case '@playlist/PLAY_OR_PAUSE_THE_MUSIC': {
                draft.isMusicPaused = action.isMusicPaused;
                break;
            }
        }
    });
}
