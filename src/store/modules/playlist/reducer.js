import produce from 'immer';

const INITIAL_STATE = {
    playlist: null,
    songlist: null,
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
        }
    });
}
