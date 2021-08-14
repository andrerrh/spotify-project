import refreshTokens from "./refreshTokens"
import setTrack from "./setTrack"

export default function buildTracks(playlist) {
    const trackMenu = document.querySelector('.aside-tracks')
    trackMenu.style.width = '15vw'
    const tracksContainer = document.querySelector('.tracks-list')
    const tracksHead = document.querySelector('#tracks-head')
    tracksHead.innerHTML = playlist.name + ' Tracks'
    tracksContainer.textContent = ''
    loadTracks(playlist, tracksContainer)
}

function loadTracks(playlist, tracksContainer) {
    const access_token = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    fetch(playlist.tracks.href, { headers: access_token })
        .then(response => {
            if (response.status === 401) {
                refreshTokens()
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            data.items.forEach((element) => {
                const node = document.createElement('li')
                const textnode = document.createTextNode(element.track.name)
                node.onclick = () => setTrack(element)
                node.appendChild(textnode)
                tracksContainer.appendChild(node)
            })
        })
}