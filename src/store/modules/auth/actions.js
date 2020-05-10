export function signInRequest(user, password) {
    return {
        type: '@auth/LOG_IN_REQUEST',
        payload: { user, password },
    };
}

export function signInSuccess(token) {
    return {
        type: '@auth/LOG_IN_SUCCESS',
        payload: { token },
    };
}

export function signInFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
    };
}
