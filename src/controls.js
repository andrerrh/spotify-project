const volumeBar = document.querySelector('.volume')
const playButton = document.querySelector('.play-pause-btn')
const progressBar = document.querySelector('.current-time')
const backButton = document.querySelector('.back-btn')
const nextButton = document.querySelector('.next-btn')

const access_token = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

export default function controls(data) {

    const access_token = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

    playButton.onclick = () => {
        if (playButton.value == "playing") {
            playButton.innerHTML = '&#9654'
            playButton.value = 'paused'
            fetch('https://api.spotify.com/v1/me/player/pause', { headers: access_token, method: 'PUT' })
        } else {
            playButton.innerHTML = '&#10074&#10074'
            playButton.value = 'playing'
            fetch('https://api.spotify.com/v1/me/player/play', { headers: access_token, method: 'PUT' })
        }
    }

    volumeBar.onchange = () => {
        volumeBar.value = volumeBar.value
        fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volumeBar.value}`, { headers: access_token, method: 'PUT' })
    }


    backButton.onclick = () => {
        fetch(`https://api.spotify.com/v1/me/player/previous`, { headers: access_token, method: 'POST' })
    }

    nextButton.onclick = () => {
        fetch(`https://api.spotify.com/v1/me/player/next`, { headers: access_token, method: 'POST' })
    }

    progressBar.onchange = () => setTrackTime(data)
}

function setTrackTime(data) {
    const trackName = data.item.name
    const albumURI = data.item.album.uri
    fetch(`https://api.spotify.com/v1/albums/${data.item.album.id}/tracks?limit=50`, {
        headers: access_token,
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const pos = data.items.map((element) => element.name).indexOf(trackName)
            fetchTrack(pos, albumURI)
        })

    function fetchTrack(pos, albumURI) {
        const bodyParams = JSON.stringify({
            context_uri: albumURI,
            offset: {
                position: pos
            },
            position_ms: progressBar.value
        })
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            headers: access_token,
            method: 'PUT',
            body: bodyParams
        })
    }
}