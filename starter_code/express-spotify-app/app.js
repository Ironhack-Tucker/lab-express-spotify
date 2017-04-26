/*jshint esversion: 6*/
const SpotifyWebApi   = require('spotify-web-api-node');
const spotify         = new SpotifyWebApi();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/artists', (req, res) => {
  let artist = req.body.artistName;
  console.log("ARTISTA: "+req.body.artistName);
  spotify.searchArtists(artist, {}, (err, data) => {
    if (err) throw err;
    else {
      let artists = data.body.artists.items;

      console.log(artists);

      res.render('artists', { artists: artists });
    }
  });
  //res.send();

});

app.post('/albums:artistId', (req, res) => {
  let artist = req.body.artistName;
  console.log("albums: "+req.body.artistName);
  spotify.getArtistAlbums(artistId, {}, (err, data) => {
    if (err) throw err;
    else {
      let albums = data.body.albums.items;

      console.log(albums);

      res.render('albums', { albums: albums });
    }
  });
  //res.send();

});

app.get('/', (req, res, next) => {
      res.render('index');
});



app.listen(3000, () => {
  console.log('Spotify App listening on port 3000!');
});
