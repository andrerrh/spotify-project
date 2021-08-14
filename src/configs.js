export default {
	clientId: '<Your Spotify Dashboard App Client ID>',
	clientSecret: '<Your Spotify Dashboard App Secret ID>',
	authBaseURL: 'https://accounts.spotify.com/authorize',
	redirect: encodeURIComponent('<Your redirect URI Specified in the Spotify Dashboard app>'),
	state: encodeURIComponent('meet' + Math.random().toString(30).substring(2, 15)),
	scope: `user-read-playback-position user-read-playback-state user-library-read playlist-read-collaborative streaming playlist-read-private user-read-currently-playing user-modify-playback-state`,
	getBearerAuth: ({'Authorization': `Basic ${btoa('<Client ID>:<Secret ID>')}`})
}