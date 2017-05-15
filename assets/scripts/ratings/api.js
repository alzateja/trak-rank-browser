'use strict'
const config = require('../config.js')
const store = require('../store.js')

// Create an Album rating
const createAlbumRating = function (data) {
  // console.log('create ratings')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/', // "http://book-json.herokuapp.com/books"
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Update an Album Rating
const updateAlbumRating = function (data, id) {
  // console.log('update ratings')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/' + id, // "http://book-json.herokuapp.com/books"
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Reset an Album Rating
const resetAlbumRating = function (id) {
  // console.log('reset ratings')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/' + id, // "http://book-json.herokuapp.com/books"
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {

  resetAlbumRating,
  createAlbumRating,
  updateAlbumRating
}
