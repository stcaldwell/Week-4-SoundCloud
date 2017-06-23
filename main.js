/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with


// 2. Create your `onSubmit` event for getting the user's search term


// 3. Create your `fetch` request that is called after a submission


// 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play

// Add '&q= + string' to the end of the api to allow it to search whatever you put in as a string.
var button = document.getElementById('button');
var searchBar = document.getElementById('searchBar');
let audio = document.getElementById('track-player');
// let container = document.getElementsByClassName('container');

button.onclick = search;

searchBar.focus();

function search() {
tracks();
users();
// container.classList.add("reveal");

}

function tracks() {

  let string = searchBar.value;

  fetch('https://api.soundcloud.com/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' +  string)

  .then(
      function(response) {
         if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
         }

         response.json().then(function(data) {
        //  console.log(data[0].title);

         let title = data;
         document.getElementById("tracks").innerHTML = "";
         for(var i = 0; i < title.length; i++) {

         let markup = `
          <div class="track-img-title-band">
            <img src="${title[i].user.avatar_url}" class="track-img">
            <button id="listen" value= "${title[i].stream_url}">Listen!</button>
            <p class="tracks">${title[i].title}</p>
            <p class="bandName">${title[i].user.username}</p>
            `

         document.getElementById("tracks").innerHTML += markup;

       }

       document.getElementById('tracks-header').innerHTML = "";

       let markupTrackHeader = `
        <h2>Tracks</h2>
      `
        document.getElementById('tracks-header').innerHTML += markupTrackHeader;

         document.getElementById('tracks').addEventListener('click', function(e) {
           if(e.target && e.target.id == 'listen') {
             let url = e.target.value;
             url += "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
             audio.removeAttribute('src');
             audio.setAttribute('src', url);
             audio.setAttribute('autoplay', true);
             audio.classList.add("reveal");
         }

       })

       })

}
)
}

function users() {

  let string = searchBar.value;

  fetch('http://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' +  string)

  .then(
      function(response) {
         if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
         }

         response.json().then(function(data) {
         console.log(data[0].username);

         let users = data;
         document.getElementById("bands").innerHTML = "";
         for(var i = 0; i < users.length; i++) {

         let markup = `
         <div class="band-img">
           <img src="${users[i].avatar_url}" class="artist-img">
           <p class="bands">${users[i].username}</p>
           <a href="${users[i].permalink_url}">Check Them Out!</a>
         </div>

         `
         document.getElementById("bands").innerHTML += markup;


       }

       document.getElementById("artists-header").innerHTML = "";

       let markupArtistsHeader = `
        <h2>Artists</h2>
      `
        document.getElementById('artists-header').innerHTML += markupArtistsHeader;

       })

}
)
}
