export function signInRequest(user, password) {
    return {
        type: '@auth/LOG_IN_REQUEST',
        payload: { user, password },
    };
}

export function signInSuccess(access_token, expires_in, refresh_token) {
    return {
        type: '@auth/LOG_IN_SUCCESS',
        payload: { access_token, expires_in, refresh_token },
    };
}

export function signInFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
    };
}
