import { encode } from 'base-64';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import { spotifyCredentials } from '../../secrets';

async function getAuthorizationCode() {
    let result
    const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
        'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
        'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];

    const scopes = scopesArr.join(' ');
    const credentials = spotifyCredentials;
    const redirectUrl = AuthSession.getRedirectUrl();

    result = await AuthSession.startAsync({
        authUrl:
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            credentials.clientId +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(redirectUrl),
    })

    return result.params.code
}


async function getToken() {
    const authorizationCode = await getAuthorizationCode();
    const credentials = spotifyCredentials;
    const credsB64 = encode(`${credentials.clientId}:${credentials.clientSecret}`)
    let response

    const bodyRequest = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`

    response = await axios.post(`https://accounts.spotify.com/api/token`, bodyRequest, {
        headers: {
            Authorization: `Basic ${credsB64}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    return response.data
}

export default getToken;
