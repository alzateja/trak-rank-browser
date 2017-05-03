'use strict'
const config = require('../config.js')
const store = require('../store.js')

let resetAlbumRating = function (id) {
  console.log('reset ratings')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/' + id, // "http://book-json.herokuapp.com/books"
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

let createAlbumRating = function (data) {
  console.log('create ratings')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/', // "http://book-json.herokuapp.com/books"
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

let updateAlbumRating = function (data, id) {
  console.log('update ratings')
  return $.ajax({
    url: config.apiOrigin + '/user_ratings/' + id, // "http://book-json.herokuapp.com/books"
    method: 'PATCH',
    data,
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
