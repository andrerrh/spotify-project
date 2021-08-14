import refreshTokens from "./refreshTokens"
import getPlaybackState from "./getPlaybackState"
import controls from "./controls";

export default function getCurrentSong() {
    setInterval(() => {
        const access_token = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
        fetch('https://api.spotify.com/v1/me/player', { headers: access_token })
            .then(response => {
                if (response.status === 401) {
                    refreshTokens()
                }
                return response.json()
            })
            .then(data => {
                const currentInfo = document.querySelector('.current-info')
                let artists = data.item.artists.map((element) => element.name)
                artists = artists.join(", ")
                const trackArtistInfo = `${data.item.name} - ${artists}`
                if (currentInfo.firstElementChild != null) {
                    currentInfo.firstElementChild.remove()
                    addElement(trackArtistInfo, currentInfo)
                } else {
                    addElement(trackArtistInfo, currentInfo)
                }
                document.querySelector('.current-song').src = data.item.album.images[1].url //Setting square and background image based on music
                document.querySelector('.main-container').style.backgroundImage = 'url(' + data.item.album.images[0].url + ')'
                getPlaybackState(data)
                controls(data)
                localStorage.setItem('deviceId', data.device.id)
            })
    }, 1000);
}

function addElement(trackInfo, currentInfo) {
    const node = document.createElement('p')
    node.innerHTML = trackInfo
    currentInfo.appendChild(node)
}