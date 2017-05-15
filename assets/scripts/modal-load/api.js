const config = require('../config.js')
const store = require('../store.js')

// AJAX request to get album information
const getAlbumInfo = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/albums/' + id, // "http://book-json.herokuapp.com/books"
    method: 'GET'
  })
}

// AJAX request to get rating information based on the album id
const getAlbumRatingInfo = function (id) {
  // console.log('test')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/by_album/' + id, // "http://book-json.herokuapp.com/books"
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
