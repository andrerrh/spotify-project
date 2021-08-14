//Gets the user an access and refresh token from spotify OAuth2 system
import params from "./configs"

export default function authorizeUser() {
	const authURL = `${params.authBaseURL}
			?client_id=${params.clientId}
			&response_type=code
			&redirect_uri=${params.redirect}
			&show_dialog=false&state=${params.state}
			&scope=${params.scope}`

	window.location.href = authURL

	getTokens()
	function getTokens() {
		if (window.location.href.includes('code')) {
			const urlParams = new URLSearchParams(window.location.search)
			const codeParam = urlParams.get('code')
			const tokenReqUrl = 'https://accounts.spotify.com/api/token'

			const details = {
				'grant_type': 'authorization_code',
				'code': codeParam,
				'redirect_uri': decodeURIComponent(params.redirect)
			}

			fetch(tokenReqUrl, {
				method: 'POST',
				headers: params.getBearerAuth,
				body: new URLSearchParams(details)
			})
				.then(response => {
					if (response.status === 400) {
						localStorage.setItem('loggedIn', false)
					} else {
						return response.json()
					}
				})
				.then(json => {
					//Save the token values
					localStorage.setItem('access_token', json.access_token)
					localStorage.setItem('refresh_token', json.refresh_token)
					localStorage.setItem('loggedIn', true)
				})
		}
	}
}

