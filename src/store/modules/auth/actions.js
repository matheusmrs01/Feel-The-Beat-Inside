export function signInSuccess(access_token, expires_in, refresh_token, spotifyUserId) {
    return {
        type: '@auth/LOG_IN_SUCCESS',
        payload: { access_token, expires_in, refresh_token, spotifyUserId },
    };
}

export function refreshToken(access_token, expires_in, refresh_token) {
    return {
        type: '@auth/REFRESH_TOKEN',
        payload: { access_token, expires_in, refresh_token },
    };
}

export function logout() {
    return {
        type: '@auth/LOGOUT'
    }
}
