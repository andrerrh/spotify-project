import refreshTokens from "./refreshTokens"
import buildTracks from "./buildTracks"
import getCurrentSong from "./getCurrentSong"

export default function getPlaylists() {
        fetchPlaylists()
}

function fetchPlaylists() {
    const access_token = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    fetch('https://api.spotify.com/v1/me/playlists', { headers: access_token })
        .then(response => {
            if(response.status === 401){
                localStorage.setItem('loggedIn', false)
                refreshTokens()
            } else {
                return response.json()
            }
        })
        .then(data => buildPlaylists(data.items))
}

function buildPlaylists(data) {
    const playlistContainer = document.querySelector('.playlists-list')
    data.forEach((element) => {
        const node = document.createElement('li')
        const textnode = document.createTextNode(element.name)
        node.appendChild(textnode)
        node.onclick = () => buildTracks(element)
        playlistContainer.appendChild(node)
    })
    getCurrentSong()
    const trackMenu = document.querySelector('.aside-tracks')
    document.querySelector('.close-track-btn').onclick = () => {
        trackMenu.style.width = '0vw'
    }
}