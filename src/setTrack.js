const access_token = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

export default function setTrack(data) {
    const albumURI = data.track.album.uri
    const trackName = data.track.name
    fetch(`https://api.spotify.com/v1/albums/${data.track.album.id}/tracks?limit=50`, {
        headers: access_token,
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const pos = data.items.map((element) => element.name).indexOf(trackName)
            fetchTrack(pos, albumURI)
        })
}

function fetchTrack(pos, albumURI) {
    const bodyParams = JSON.stringify({
        context_uri: albumURI,
        offset: {
            position: pos
        }
    })
    fetch(`https://api.spotify.com/v1/me/player/play`, {
        headers: access_token,
        method: 'PUT',
        body: bodyParams
    })
}