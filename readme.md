# This project was made using JavaScript, the spotify API, Webpack and some plugins.
It was made for studying purposes, to learn the OAuth2 system and a bit more of DOM manipulation.
Some things such as the client id, secret id and redirect uri must be manually specificed in the config.js file, since the whole project was made using frontend technology
and there was no way to hide the "secret values" without a backend server.

In order to run the project you must
1. please go to https://developer.spotify.com/dashboard/applications and create an application 
2. paste the id's and the redirect uri in the config.js file and add this same URI in the application settings menu
3. open the folder with a terminal and use npm install to install node_modules dependencies
4. use npm run dev to "compile" webpack modules
5. open the index.html file generated in the /public/ folder in your browser and login with your spotify account

#### Notes
1. Some functionalities might not work in a non-premium spotify account
2. The redirect URI must be the same of when you open the index.html, if you're running the file with Live Server for instance, you'll probably get something like
(http://127.0.0.1:5500/index.html), this is the URI that must be added in the config.js file and in the spotify dashboard whitelist.

#### Images

![example1](/exampleimgs/Screenshot_1.png)
![example2](/exampleimgs/Screenshot_2.png)