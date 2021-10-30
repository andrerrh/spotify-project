import './assets/css/global.css'
import html from '../index.html'
import authorizeUser from "./authorize"
import buildPlaylists from "./buildPlaylists"
import controls from './controls'

if (window.location.href.includes('index.html')) {
	const loginBtn = document.querySelector('#login-btn')
	loginBtn.onclick = () => {
		authorizeUser()
	}
	const urlParams = new URLSearchParams(window.location.search)
	const codeParam = urlParams.get('code')
	if(codeParam != null) setTimeout(() => {
		window.location.href = 'main.html'
	}, 1500)
}

if (window.location.href.includes('main.html')) {
	document.querySelector('.close-btn').onclick = () => {
		document.querySelector('.aside').style.width = '0px'
		document.querySelector('.aside-tracks').style.width = '0px'
		document.querySelector('.aside-btn').style.display = 'inline-block'
	}
	document.querySelector('.aside-btn').onclick = () => {
		document.querySelector('.aside').style.width = '11vw'
		document.querySelector('.aside-btn').style.display = 'none'
	}
	window.addEventListener("load", () => {
		buildPlaylists()
		controls()
	})
}
