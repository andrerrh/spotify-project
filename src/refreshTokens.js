import params from "./configs"

export default function refreshTokens() {
    const tokenReqUrl = 'https://accounts.spotify.com/api/token'

    const details = {
        'grant_type': 'refresh_token',
        'client_id': params.clientId,
        'refresh_token': localStorage.getItem('refresh_token')
    }

    fetch(tokenReqUrl, {
        method: 'POST',
        headers: params.getBearerAuth,
        body: new URLSearchParams(details)
    })
    .then(response => response.json())
    .then(json => {
        localStorage.setItem('access_token', json.access_token)
        localStorage.setItem('loggedIn', false)
    })
}