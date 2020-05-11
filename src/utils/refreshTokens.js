import { encode } from 'base-64';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { spotifyCredentials } from '../../secrets';

async function refreshTokens() {
    const credentials = await spotifyCredentials;
    const credsB64 = encode(`${credentials.clientId}:${credentials.clientSecret}`);
    const refreshToken = useSelector(state => state.auth.refresh_token);

    const bodyRequest = `grant_type=refresh_token&refresh_token=${refreshToken}`

    response = await axios.post(`https://accounts.spotify.com/api/token`, bodyRequest, {
        headers: {
            Authorization: `Basic ${credsB64}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    return response.data
}

export default refreshTokens;
