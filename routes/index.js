var express = require('express');
var router = express.Router();

var request = require('request');

var sources = [
  { name: 'My Favorites', sourceName: 'my-favs', imgUrl: 'fav-sm.png', topStories: [], primary: '#e54e42', secondary: '#ffffff' },
  { name: 'BBC News', sourceName: 'bbc-news', imgUrl: 'bbc-sm.png', topStories: [], primary: '#9a0e15', secondary: '#ffffff' },
  { name: 'Business Insider', sourceName: 'business-insider', imgUrl: 'bi-sm.png', topStories: [], primary: '#20617b', secondary: '#ffffff' },
  { name: 'BuzzFeed', sourceName: 'buzzfeed', imgUrl: 'bf-sm.png', topStories: [], primary: '#eb382e', secondary: '#ffffff' },
  { name: 'CNBC', sourceName: 'cnbc', imgUrl: 'cnbc-sm.png', topStories: [], primary: '#533e96', secondary: '#ffffff' },
  { name: 'CNN', sourceName: 'cnn', imgUrl: 'cnn-sm.png', topStories: [], primary: '#c91921', secondary: '#ffffff' },
  { name: 'ESPN', sourceName: 'espn', imgUrl: 'espn-sm.png', topStories: [], primary: '#c8232d', secondary: '#ffffff' },
  { name: 'Google News', sourceName: 'google-news', imgUrl: 'google-sm.png', topStories: [], primary: '#42af61', secondary: '#ffffff' },
  { name: 'Newsweek', sourceName: 'newsweek', imgUrl: 'nw-sm.png', topStories: [], primary: '#e82635', secondary: '#f2f2f2' },
  { name: 'Reddit', sourceName: 'reddit-r-all', imgUrl: 'red-sm.png', topStories: [], primary: '#cfe4f8', secondary: '#050607' },
  { name: 'The Huffington Post', sourceName: 'the-huffington-post', imgUrl: 'hp-sm.png', topStories: [], primary: '#347163', secondary: '#ffffff' },
  { name: 'The New York Times', sourceName: 'the-new-york-times', imgUrl: 'nyt-sm.png', topStories: [], primary: '#060708', secondary: '#ffffff' },
  { name: 'The Verge', sourceName: 'the-verge', imgUrl: 'tv-sm.png', topStories: [], primary: '#000000', secondary: '#eeeeee' },
  { name: 'The Wall Street Journal', sourceName: 'the-wall-street-journal', imgUrl: 'wsj-sm.png', topStories: [], primary: '#171717', secondary: '#ffffff' },
  { name: 'The Washington Post', sourceName: 'the-washington-post', imgUrl: 'wp-sm.png', topStories: [], primary: '#000000', secondary: '#ffffff' },
  { name: 'Time', sourceName: 'time', imgUrl: 'time-sm.png', topStories: [], primary: '#ef291a', secondary: '#fbfefe' },
  { name: 'USA Today', sourceName: 'usa-today', imgUrl: 'usat-sm.png', topStories: [], primary: '#1aa0d7', secondary: '#ffffff' },
  { name: 'Wired', sourceName: 'wired-de', imgUrl: 'w-sm.png', topStories: [], primary: '#000000', secondary: '#d9d9d9' }
]

var topStories = [];

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

var favorites = [];

/* GET TOP STORIES REQUEST */
router.get('/sources', function(req, res) {
  res.send(sources);
});

/* GET FAVORITES REQUEST */
router.get('/favorites', function(req, res) {
  res.send(favorites);
});

/* POST REQUEST */
router.post('/favorites', function(req, res) {
  console.log("In favorites post");
  for (var i = 0; i < favorites.length; i++) {
    var f = favorites[i];
    if (f.title == req.body.title) {
      res.end('{"error" : "Article is already saved into favorites", "conflict" : "409"}');
      return;
    }
  }
  favorites.push(req.body);
  res.end('{"success" : "Updated successfully!", "status" : "200"}');
});

/* DELETE REQUEST */
router.delete('/favorites', function(req, res) {
  console.log("In favorites delete");

  var idx = req.query.idx;
//  console.log(favorites[idx]);
  favorites.splice(idx, 1);
//  console.log("--------");
//  console.log(favorites);
  res.end('{"success" : "Deleted successfully!", "status" : "200"}');
});

module.exports = router;
