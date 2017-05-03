const config = require('../config.js')
const store = require('../store.js')

let getAlbumInfo = function(id) {
  return $.ajax({
    url: config.apiOrigin + '/albums/' + id, // "http://book-json.herokuapp.com/books"
    method: 'GET'
  })
}

let getAlbumRatingInfo = function(id) {
  console.log("test");
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/' + id, // "http://book-json.herokuapp.com/books"
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getAlbumRatingInfo,
  getAlbumInfo
}
