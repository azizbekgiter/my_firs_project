const express = require('express');
const app = express();

// Song pool
const songs = [
  "New York, New York",
  "My Way",
  "Fly Me to the Moon",
  "Strangers in the Night",
  "I've Got You Under My Skin",
  "Come Fly with Me",
  "The Way You Look Tonight",
  "Summer Wind",
  "That's Life",
  "Chicago",
  "Moon River",
  "All of Me",
  "It Was a Very Good Year",
  "Love and Marriage",
  "The Lady Is a Tramp",
  "Witchcraft",
  "Something Stupid",
  "I Get a Kick Out of You",
  "High Hopes",
  "You Make Me Feel So Young"
];

// Route to get a random song
app.get('/', (req, res) => {
  const randomSong = songs[Math.floor(Math.random() * songs.length)];
  res.send(randomSong);
});

// Route to get Sinatra's birth date
app.get('/birth_date', (req, res) => {
  res.send('December 12, 1915');
});

// Route to get Sinatra's birth city
app.get('/birth_city', (req, res) => {
  res.send('Hoboken, New Jersey');
});

// Route to get Sinatra's wives
app.get('/wives', (req, res) => {
  const wives = 'Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx';
  res.send(wives);
});

// Route to redirect to Sinatra's picture
app.get('/picture', (req, res) => {
  res.redirect('https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg');
});

// Route for public page
app.get('/public', (req, res) => {
  res.send('Bu sahifani hamma korishi mumkin');
});

// Route for protected page (basic auth)
app.use("/protected", (req, res, next) => { 
  const auth = { 
    login: 'devog', 
    password: 'admin' 
  } 
  const [, b64auth = ''] = (req.headers.authorization || '').split(' ') 
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':') 
  if (login && password && login === auth.login && password === auth.password) { 
      res.send("<h1>Sizni saytda kurganimizdan! Xursandmiz</h1>"); 
      return next() 
  } 
  res.set('WWW-Authenticate', 'Basic realm="401"') 
  res.status(401).send('401 Not authorized') 
})

// Listen on port 8080
app.listen(8080, '0.0.0.0', () => {
  console.log('Server listening on port 8080');
});