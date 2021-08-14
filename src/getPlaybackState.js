export default function getPlaybackState(data) {
    setCurrentPlayback(data)
}

const volumeBar = document.querySelector('.volume')
const playButton = document.querySelector('.play-pause-btn')
const progressBar = document.querySelector('.current-time')

function setCurrentPlayback(data) {
    if (volumeBar.value != data.device.volume_percent) volumeBar.value = data.device.volume_percent
    data.is_playing ? playButton.innerHTML = '&#10074&#10074' : playButton.innerHTML = '&#9654'
    data.is_playing ? playButton.value = 'playing' : playButton.value = 'paused'
    progressBar.max = data.item.duration_ms
    progressBar.value = data.progress_ms
}