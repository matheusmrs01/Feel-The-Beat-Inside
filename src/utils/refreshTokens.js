import { encode } from 'base-64';
import axios from 'axios';

import { spotifyCredentials } from '../../secrets';

async function refreshSpotifyTokens(refreshToken) {
    let response

    const credentials = await spotifyCredentials;
    const credsB64 = await encode(`${credentials.clientId}:${credentials.clientSecret}`);
    const bodyRequest = `grant_type=refresh_token&refresh_token=${refreshToken}`

    response = await axios.post(`https://accounts.spotify.com/api/token`, bodyRequest, {
        headers: {
            Authorization: `Basic ${credsB64}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    return response.data
}

export default refreshSpotifyTokens;
