import produce from 'immer';

const INITIAL_STATE = {
    access_token: null,
    expires_in: null,
    refresh_token: null,
    spotifyUserId: null,
    signed: false,
    loading: false
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/LOG_IN_SUCCESS': {
                draft.access_token = action.payload.access_token;
                draft.expires_in = action.payload.expires_in;
                draft.refresh_token = action.payload.refresh_token;
                draft.spotifyUserId = action.payload.spotifyUserId;
                draft.signed = true;
                draft.loading = false;
                break;
            }
            case '@auth/REFRESH_TOKEN': {
                draft.access_token = action.payload.access_token;
                draft.expires_in = action.payload.expires_in;
                draft.refresh_token = action.payload.refresh_token;
                break;
            }
            case '@auth/LOGOUT': {
                draft.access_token = '';
                draft.expires_in = '';
                draft.refresh_token = '';
                draft.signed = false;
            }
        }
    });
};
